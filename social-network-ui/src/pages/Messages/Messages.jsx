import React, { useEffect, useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

import axiosIns from '../../axiosInstance';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import MessagesModal from '../../components/MessagesModal/MessagesModal';
import {
  addChatMessage,
  delletedChats,
  fetchChat,
  fetchChatMessages,
  getAuthorId,
  selectMessages,
  selectSelectedChatId,
  selectVisibleModalWindow,
  sendMessage,
  setSelectedChatId,
  setText,
  toggleModalWindow,
} from '../../features/slices/massagesSlise';
import { SandMessageIcon } from '../../icon';
import { SOCKET_URL } from '../../util/constants';
import { formatChatMessageDate } from '../../util/formatDate';
import { useMessagesStyles } from './MessagesStyles';
import MyMassageSender from "../../components/TestMessages/MyMassageSender";
import MessageWithTweet from "../../components/TestMessages/theirMessageWithTweet";

const Messages = ({ chatId }) => {
  const classes = useMessagesStyles();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.messages.chats);
  const selectedChatId = useSelector(selectSelectedChatId);
  const messages = useSelector(selectMessages);
  const [filteredMessage, setFilteredMessage] = useState([]);
  const [message, setMessage] = useState('');
  const visibleModalWindow = useSelector(selectVisibleModalWindow);
  const chatEndRef = useRef(null);
  const [author, setAuthor] = useState(null);
  const username = useSelector((state) => (state.auth.user ? state.auth.user.username : null));
  const authorId = useSelector((state) => state.messages.authorId);
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');

  const [chatName, setChatName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteChat = () => {
    if (selectedChatIndex !== null) {
      const chatId = filteredMessage[selectedChatIndex]?.chatId;
      setSenderName('');
      setRecipientName('');
      if (chatId) {
        axiosIns
            .delete(`/api/messages/chats/${chatId}`)
            .then((response) => {
              setStatus(true);
              setError(null);
            })
            .catch((error) => {
              setStatus(true);
              setError(error.message);
            });
        dispatch(delletedChats(chatId));
      }
    }
    handleClose();
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIdAuthor = (username) => {
    if (username) {
      axiosIns.get(`/api/search/users?q=${username}`, {}).then((response) => {
        const author = response.data;
        const id = author[0].id;
        setAuthor(id);
        dispatch(getAuthorId(id));
      });
    }
  };

  const onMessageReceived = (msg) => {
    dispatch(sendMessage(msg)).then(() => {
      setMessage('');
    });
    dispatch(delletedChats(chatId));

    if (selectedChatId || chatId) {
      dispatch(addChatMessage({ chatId: selectedChatId, message: msg }));
      dispatch(fetchChatMessages(selectedChatId || chatId)).then(() => {});
    } else {
      throw error('No chat selected.');
    }
  };

  const onConnected = () => {};

  const handleListItemClick = async (group) => {
    const chatId = group.chatId;
    dispatch(setSelectedChatId(chatId));
    setSelectedChatId(chatId);

    const senderUsername = group.senderUsername || '';
    const recipientUsername = group.recipientUsername || '';
    const newSenderName = senderUsername === username ? senderUsername : recipientUsername;
    const newRecipientName = senderUsername === username ? recipientUsername : senderUsername;

    setSenderName(newSenderName);
    setRecipientName(newRecipientName);
    setChatName(group.chatId === selectedChatId ? chatName : newSenderName);

    dispatch(setText(`${newSenderName} ${newRecipientName}`));
    await dispatch(fetchChatMessages(chatId));
  };



  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!selectedChatId) {
      return;
    }
    if (trimmedMessage !== '') {
      const sender = chats.find((chat) => chat.chatId === (selectedChatId || chatId));
      const senderUsername = senderName || '';
      const recipientUsername = recipientName || '';

      const messageToSend = {
        chatId: selectedChatId || chatId,
        message: trimmedMessage,
        authorId: author,
        senderUsername,
        recipientUsername,
        chatName,
        parentId:
            messages[selectedChatId]?.messages
                .slice()
                .reverse()
                .find((msg) => msg.senderId === sender?.senderId)?.messageId || undefined,
      };

      return dispatch(sendMessage(messageToSend)).then(() => {
        setMessage('');
      });
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const onOpenModalWindow = () => {
    dispatch(toggleModalWindow());
  };

  const onCloseModalWindow = () => {
    dispatch(toggleModalWindow());
  };



  useEffect(() => {
    const groupedChats = Object.values(chats).reduce((result, chat) => {
      const existingGroup = result.find((group) => group.chatId === chat.chatId);
      if (existingGroup) {
        existingGroup.chats.push(chat);
      } else {
        result.push({
          chatId: chat.chatId,
          chats: [chat],
        });
      }

      return result;
    }, []);

    setFilteredMessage(groupedChats);
  }, [chats]);

  useEffect(() => {
    function sortMessagesByChatId(messages) {
      const sortedChats = [];
      messages.forEach((message) => {
        const existingChat = sortedChats.find((chat) => chat.chatId === message.chatId);
        if (existingChat) {
          existingChat.chats.push(message.message);
        } else {
          sortedChats.push({
            chatId: message.chatId,
            chats: [message.message],
            ...message,
          });
        }
      });

      return sortedChats.sort((a, b) => a.chatId - b.chatId);
    }

    setFilteredMessage(sortMessagesByChatId(chats));
  }, [chats]);


  const handleExitClick = () => {
    dispatch(setSelectedChatId(undefined));
    dispatch(setText(''));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage(selectedChatId, authorId);
    }
  };
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedChatIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedChatIndex(null);
  };
  const handleContextMenu = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    handleClick(event, index);
  };
  useEffect(() => {
    if (username) {
      getIdAuthor(username);
    }
  }, [username]);

  useEffect(() => {
    dispatch(fetchChat());
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(fetchChat(authorId));
    scrollToBottom();
  }, [dispatch, authorId]);

  const action = (
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
  );

  return (
      <>
        <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/message']}
            onConnect={onConnected}
            onDisconnect={() => 'Disconnected!'}
            onMessage={onMessageReceived}
            debug={false}
        />

        <Grid sx={{ padding: "12px 0px 0px 0px !important" }} md={4} item>

            <Paper variant="outlined">
              <Paper sx={{
                padding: "12px 0px 0px 0px !important",
                height: 47,
                zIndex: 1,
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                alignItems: 'center',
                backgroundColor: 'rgb(19, 36, 51)',
                color: 'rgb(255, 255, 255)',
                flex: 1,
                '& h6': {
                  marginLeft: 15,
                  fontWeight: 800,
                },
                "& svg": {
                  marginRight: 20
                },
              }}>
                <div>
                  <Typography variant="h6">Messages</Typography>
                </div>
              </Paper>
              {Object.values(chats).length === 0 ? (
                  <>
                    <div style={{
                      margin: "10px",
                      alignItems: "center",
                    }}><div style={ {
                      paddingTop: 83,
                      lineHeight: 1.1,
                      fontSize: 29,
                      fontWeight: 800,
                      margin: "0px 30px",
                    }}>Send a message, get a message</div>
                      <div style={{
                        fontSize: 14,
                        color: 'rgb(83, 100, 113)',
                        margin: '8px 30px 27px 30px',}}>
                        Direct Messages are private conversations between you and other people on
                        Twitter. Share Tweets, media, and more!
                      </div>
                      <Button
                          onClick={onOpenModalWindow}
                          sx={{
                            marginLeft: 5,
                            height: 48,
                            backgroundColor: 'rgb(63, 81, 181)',
                            "& .MuiButton-label": {
                              fontSize: 15,
                            },
                          }}

                          variant="contained"
                          color="primary"
                      >
                        Start a conversation
                      </Button>
                    </div>
                  </>
              ) : (
                  <>
                    <List component="nav"
                          sx={{
                            "& .Mui-selected": {
                              backgroundColor: 'rgb(255, 255, 255, 0.03)',
                              "&:hover": {
                                backgroundColor: 'rgb(63, 81, 181)',
                              },
                            },
                          }} aria-label="main mailbox folders">
                      {filteredMessage.map((group, index) =>
                          group && group.chats && group.chats.length > 0 ? (
                              <ListItem
                                  key={group.chatId}
                                  className={classNames(classes.listItem, {
                                    [classes.selected]: group.chatId === selectedChatId,
                                  })}
                                  onClick={() => handleListItemClick(group)}
                                  onContextMenu={(event) => handleContextMenu(event, index)}
                              >
                                <div style={{
                                  height: 76,
                                  width: "100%",
                                  display: "flex",
                                  alignItems: 'flex-start',
                                  paddingLeft: 15,
                                  paddingTop: 8,
                                  paddingBottom: 8,
                                  cursor: 'pointer',
                                }}>
                                  <div style={{ flex: 1 }}>
                                    <div>
                                      {group.senderUsername === username ? (
                                          <Typography >{group.recipientUsername}</Typography>
                                      ) : (
                                          <Typography >{group.senderUsername}</Typography>
                                      )}
                                      </div>
                                    </div>
                                </div>
                              </ListItem>
                          ) : null
                      )}
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={handleDeleteChat}>Deleted</MenuItem>
                      </Menu>
                    </List>
                  </>
              )}
            </Paper>
        </Grid>

        <Grid sx={{ padding: "12px 0px 0px 0px !important" }} md={6} item>
          {selectedChatId === undefined ? (
              <div style={{
                minWidth: 600,
                padding: 0,
                borderLeft: 0,
              }}>
                <Paper variant="outlined">
                  <div style={{
                    width: 320,
                    margin: "50px auto",
                    color: 'rgb(255, 255, 255)',
                    paddingTop: 300,
                  }}>
                    <div style={{
                      lineHeight: 1.1,
                      fontSize: 29,
                      fontWeight: 800,
                    }}>You don’t have a message selected</div>
                    <div style={{
                      fontSize: 14,
                      color: 'rgb(83, 100, 113)',
                      margin: '8px 0px 27px 0px',
                    }}>Choose one from your existing messages, or start a new one.</div>
                    <Button
                        onClick={onOpenModalWindow}
                        sx={{
                          marginTop: 5,
                          height: 52,
                          backgroundColor: 'rgb(63, 81, 181)',
                        }}
                        variant="contained"
                        color="primary"
                    >
                      New message
                    </Button>
                  </div>
                </Paper>
              </div>
          ) : (
              <div style={{
                minWidth: 600,
                padding: 0,
                borderLeft: 0,
              }}>
                <Paper variant="outlined">
                  <Paper sx={{
                    width: 598,

                  }}>
                    <div style={{ flex: 1 }}>
                      <IconButton
                          sx={{
                            color:'rgb(63, 81, 181)',
                          }}
                          onClick={handleExitClick}
                          color="primary"
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      {senderName === username ? (
                          <Typography sx={{
                            alignItems: "center",
                            display: "inline-block",
                            color: "rgb(255,255,255)",
                            fontWeight: 400,
                            fontSize: 15,
                          }}>{recipientName}</Typography>
                      ) : (
                          <Typography sx={{
                            alignItems: "center",
                            display: "inline-block",
                            color: "rgb(255,255,255)",
                            fontWeight: 400,
                            fontSize: 15,
                          }}>{senderName}</Typography>
                      )}
                    </div>
                  </Paper>
                  <Paper
                  sx={{
                    padding: "53px 15px",
                    height: 600,
                    overflowY: "auto",
                    border: 0,
                  }}>
                    <React.Fragment>
                      {Array.isArray(messages?.messages) &&
                          messages.messages
                              .filter((message) => message.message.trim() !== '')
                              .reverse()
                              .map((massage) => (
                                  <div key={massage.messageId}>
                                    <div ref={chatEndRef}></div>


                                      <div className={authorId === massage.senderId
                                                ? classes.MyMassageSender
                                                : classes.theirMessageWithTweet}>
                                        <span style={{
                                          fontSize: 13,
                                          fontWeight:"bold"
                                        }}>{massage.senderUsername}</span>
                                        {authorId === massage.senderId ? (
                                            <MyMassageSender>{massage.message}</MyMassageSender>
                                        ): (
                                            <MessageWithTweet>{massage.message}</MessageWithTweet>
                                        )}
                                        <span style={{
                                          paddingTop:10,
                                          fontSize:11,
                                          top: 19
                                        }}>
                                          {formatChatMessageDate(massage.timestamp)}
                                        </span>
                                      </div>
                                  </div>
                              ))}
                      <div ref={chatEndRef}></div>
                    </React.Fragment>
                  </Paper>
                  <Paper sx={{
                    display: 'flex',
                    bottom: 1,
                    width: 598,
                    padding: 1,
                    borderRight: 0,
                    borderLeft: 0,
                    borderBottom: 0,
                  }}>
                    <MessageInput
                        sx={{
                          width: '100%',

                        }}
                        multiline
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        variant="outlined"
                        placeholder="Start a new messageа"
                    />
                    <div style={{
                      marginLeft: 8,
                      width: 30,
                      height: 30,
                    }}>
                      <IconButton
                          onClick={handleSendMessage}
                          color="primary"
                          style={{
                            width: 30,

                            paddingTop: 22,
                            height: "0.82em",
                          }}
                      >{SandMessageIcon}</IconButton>
                    </div>

                  </Paper>
                </Paper>
              </div>
          )}
        </Grid>
        <Snackbar
            open={status}
            autoHideDuration={6000}
            onClose={handleClose}
            message={error ? `${error}` : 'Deleted successfully'}
            action={action}
        />
        <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
      </>
  );
};

export default Messages;


