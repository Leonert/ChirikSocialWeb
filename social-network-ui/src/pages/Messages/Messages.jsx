import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, List, ListItem, Menu, MenuItem, Paper, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

import axiosIns from '../../axiosInstance';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import MessagesModal from '../../components/MessagesModal/MessagesModal';
import {
  addChat,
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

const Messages = ({ chatId }) => {
  const classes = useMessagesStyles();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.messages.chats);
  const selectedChatId = useSelector(selectSelectedChatId);
  const messages = useSelector(selectMessages);

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
      const chatId = groupedChats[selectedChatIndex]?.chatId;
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

  const onMessageReceived = async (msg) => {
    dispatch(sendMessage(msg)).then(() => {
      setMessage('');
    });
    dispatch(delletedChats(chatId));
    await dispatch(addChat(chatId));
    if (selectedChatId || chatId) {
      dispatch(fetchChatMessages(selectedChatId || chatId)).then(() => {
      });
    } else {
      throw new Error('Зось інще');
    }
  };

  const onConnected = () => {};

  const handleListItemClick = async (group) => {
    const chatId = group.chatId;
    dispatch(setSelectedChatId(chatId));
    setSelectedChatId(chatId);

    const senderUsername = group.chats[0]?.senderUsername || '';
    const recipientUsername = group.chats[0]?.recipientUsername || '';
    const newSenderName = username === senderUsername ? senderUsername : recipientUsername;
    const newRecipientName = username === senderUsername ? recipientUsername : senderUsername;

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

  const groupedChats = Object.values(chats).reduce((result, chat) => {
    if (chat && chat.chatId) {
      const existingGroup = result.find((group) => group.chatId === chat.chatId);
      if (existingGroup) {
        existingGroup.chats.push(chat);
      } else {
        result.push({
          chatId: chat.chatId,
          chats: [chat],
        });
      }
    }

    return result;
  }, []);




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

      <Grid className={classes.grid} md={4} item>
        <div className={classes.messagesContainer}>
          <Paper variant="outlined">
            <Paper className={classes.header}>
              <div>
                <Typography variant="h6">Messages</Typography>
              </div>
            </Paper>
            {Object.values(chats).length === 0 ? (
                <>
                  <div className={classes.messagesTitleContainer}>
                    <div className={classes.messagesTitle}>
                      Send a message, get a message
                    </div>
                    <div className={classes.messagesText}>
                      Direct Messages are private conversations between you and other people on Twitter.
                      Share Tweets, media, and more!
                    </div>
                    <Button
                        onClick={onOpenModalWindow}
                        className={classes.messagesButton}
                        variant="contained"
                        color="primary"
                    >
                      Start a conversation
                    </Button>
                  </div>

                </>
            ) : (
              <>
                <List component="nav" className={classes.list} aria-label="main mailbox folders">
                  {groupedChats.map((group, index) =>
                    group && group.chats && group.chats.length > 0 ? (
                      <ListItem
                        key={group.chatId}
                        button
                        className={classNames(classes.listItem, {
                          [classes.selected]: group.chatId === selectedChatId,
                        })}
                        onClick={() => handleListItemClick(group)}
                        onContextMenu={(event) => handleContextMenu(event, index)}
                      >
                        <div className={classes.userWrapper}>
                          <div style={{ flex: 1 }}>
                            <div className={classes.userHeader}>
                              <div>
                                {group.chats[0]?.senderUsername === username ? (
                                  <Typography className={classes.chatName}>
                                    @{group.chats[0]?.recipientUsername}
                                  </Typography>
                                ) : (
                                  <Typography className={classes.chatName}>
                                    @{group.chats[0]?.senderUsername}
                                  </Typography>
                                )}
                              </div>
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
        </div>
      </Grid>

      <Grid className={classes.grid} md={6} item>
        {selectedChatId === undefined ? (
          <div className={classes.chatContainer}>
            <Paper variant="outlined">
              <div className={classes.chatInfoWrapper}>
                <div className={classes.chatInfoTitle}>You don’t have a message selected</div>
                <div className={classes.chatInfoText}>Choose one from your existing messages, or start a new one.</div>
                <Button
                  onClick={onOpenModalWindow}
                  className={classes.chatInfoButton}
                  variant="contained"
                  color="primary"
                >
                  New message
                </Button>
              </div>
            </Paper>
          </div>
        ) : (
          <div className={classes.chatContainer}>
            <Paper variant="outlined">
              <Paper className={classes.chatHeader}>
                <div style={{ flex: 1 }}>
                  <IconButton className={classes.ArrowBackIcon} onClick={handleExitClick} color="primary">
                    <ArrowBackIcon />
                  </IconButton>
                  {senderName === username ? (
                    <Typography className={classes.usernameTop}>@{recipientName}</Typography>
                  ) : (
                    <Typography className={classes.usernameTop}>@{senderName}</Typography>
                  )}
                </div>
              </Paper>
              <Paper className={classes.chat}>
                <React.Fragment>
                  {Array.isArray(messages?.messages) &&
                    messages.messages
                      .filter((message) => message.message.trim() !== '')
                      .reverse()
                      .map((massage) => (
                        <div key={massage.messageId}>
                          <div ref={chatEndRef}></div>

                          <div className={classNames(classes.messageContent)}>
                            <div
                              className={
                                authorId === massage.senderId ? classes.MyMassageSender : classes.theirMessageWithTweet
                              }
                            >
                              <span className={classNames(classes.tweetUserFullName, classes.messageSender)}>
                                {massage.senderUsername}
                              </span>
                              <span
                                className={
                                  authorId === massage.senderId ? classes.ownMessageWith : classes.senderMessageWith
                                }
                              >
                                {massage.message}
                                <span className={classes.messageTimestamp}>
                                  {formatChatMessageDate(massage.timestamp)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  <div ref={chatEndRef}></div>
                </React.Fragment>
              </Paper>
              <Paper className={classes.chatFooter}>
                <MessageInput
                  multiline
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  variant="outlined"
                  placeholder="Start a new message"
                />
                <div style={{ marginLeft: 8 }} className={classes.chatIcon}>
                  <IconButton onClick={handleSendMessage} color="primary">
                    <span>{SandMessageIcon}</span>
                  </IconButton>
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
