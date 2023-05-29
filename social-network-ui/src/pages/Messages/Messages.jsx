import { Avatar, Button, Grid, IconButton, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';
import { SandMessageIcon} from '../../icon';
import { DEFAULT_PROFILE_IMG } from '../../util/url';
import { useMessagesStyles } from './MessagesStyles';
import MessagesModal from "../../components/MessagesModal/MessagesModal";
import {
  fetchChat,
  fetchChatMessages,
  selectChats,
  selectMessages,
  selectSelectedChatId,
  selectVisibleModalWindow,
  sendMessage,
  setSelectedChatId,
  setText,
  toggleModalWindow
} from "../../features/slices/massagesSlise";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import {formatChatMessageDate} from "../../util/formatDate";
import {MessageInput} from "../../components/MessageInput/MessageInput";

const Messages = ({ chatId, senderId }) => {
  const classes = useMessagesStyles();
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
  const selectedChatId = useSelector(selectSelectedChatId);
  const messages = useSelector(selectMessages);
  const [message, setMessage] = useState('');
  const visibleModalWindow = useSelector(selectVisibleModalWindow);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = (senderId, recipientId) => {
    const trimmedMessage = message.trim();

    if (trimmedMessage !== '') {
      const messageToSend = {
        chatId: selectedChatId || chatId,
        message: trimmedMessage,
        senderId,
        recipientId,
      };

      dispatch(sendMessage(messageToSend))
          .then(() => {
            setMessage('');
          })
          .catch((error) => {
            error('Failed to send message. Please try again.');
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

  const handleListItemClick = async (group) => {
    const chatId = group.chatId;
    dispatch(setSelectedChatId(chatId));
    try {
      await dispatch(fetchChatMessages(chatId));
      scrollToBottom();
    } catch (error) {
      error('Error fetching chat messages:', error);
    }
  };

  useEffect(() => {
    const fetchChatsAndScroll = async () => {
      await dispatch(fetchChat());
      scrollToBottom();
    };

    fetchChatsAndScroll();
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

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

  const handleExitClick = () => {
    dispatch(setSelectedChatId(undefined));
    dispatch(setText(''));
  };
  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     handleSendMessage(selectedChatId, senderId);
  //   }
  // };


  return (
      <>
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
                    <div className={classes.messagesTitle}>Send a message, get a message</div>
                    <div className={classes.messagesText}>
                      Direct Messages are private conversations between you and other people on Twitter. Share Tweets, media,
                      and more!
                    </div>
                    <Button onClick={onOpenModalWindow} className={classes.messagesButton} variant="contained" color="primary">
                      Start a conversation
                    </Button>
                  </>
              ) : (
                  <>
                    <div className={classes.searchWrapper}>

                    </div>
                    <List component="nav" className={classes.list} aria-label="main mailbox folders">
                      {groupedChats.map((group) =>
                          group && group.chats && group.chats.length > 0 ? (
                              <ListItem
                                  key={group.chatId}
                                  button
                                  className={classes.listItem}
                                  onClick={() => handleListItemClick(group)}
                              >
                                <div className={classes.userWrapper}>
                                  <Avatar
                                      className={classes.userAvatar}
                                      src={
                                        (group.chats[0]?.avatar?.src || '') ? group.chats[0].avatar.src : DEFAULT_PROFILE_IMG
                                      }
                                  />
                                  <div style={{ flex: 1 }}>
                                    <div className={classes.userHeader}>
                                      <div>
                                        <Typography className={classes.userFullName}>
                                          {group.chats[0]?.recipientUsername || ''}
                                        </Typography>
                                        <Typography className={classes.username}>
                                          @{group.chats[0]?.recipientUsername || ''}
                                        </Typography>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ListItem>
                          ) : null
                      )}
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
                    <Avatar className={classes.chatAvatar} src={DEFAULT_PROFILE_IMG} />
                    <div style={{ flex: 1 }}>
                      <Typography className={classes.username}>@{messages.senderUsername || ''}</Typography>
                      <IconButton onClick={handleExitClick} color="primary">
                        <span className={classes.buttumContainer}>back</span>
                      </IconButton>
                    </div>
                  </Paper>
                  <div className={classes.chatContent}>
                    <div className={classes.chat}>
                      {Array.isArray(messages?.messages) &&
                          messages.messages.map((message, index) => {
                            const previousMessage = messages[selectedChatId]?.messages[index - 1];
                            const showDateSeparator =
                                previousMessage &&
                                !isValidDate(new Date(previousMessage.timestamp)) &&
                                isValidDate(new Date(message.timestamp));

                            return (
                                <React.Fragment key={message.messageId}>
                                  {showDateSeparator && (
                                      <div className={classes.dateSeparator}>
                                        {formatChatMessageDate(new Date(message.timestamp))}
                                      </div>
                                  )}
                                  <div
                                      className={classNames(classes.messageContainer, {
                                        [classes.ownMessage]: message.senderId,
                                      })}
                                  >

                                    <div
                                        className={classNames(classes.messageContent, {
                                          [classes.ownMessageContent]: message.senderId,
                                        })}
                                    >
                                      <span className={classes.tweetUserFullName}>{message.senderUsername}</span>
                                      <Typography className={classes.myMessage}>{message.message}</Typography>
                                      <Typography className={classes.messageTimestamp}>
                                        {formatChatMessageDate(new Date(message.timestamp))}
                                      </Typography>
                                    </div>
                                  </div>
                                </React.Fragment>
                            );
                          })}
                      <div ref={chatEndRef} />
                    </div>
                  </div>
                  <div className={classes.chatFooter}>
                    <MessageInput
                        multiline
                        value={message.slice(0, 254)}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Start a new message"
                        maxLength={254}

                        // onKeyDown={handleKeyDown}
                    />
                    <div style={{ marginLeft: 8 }} className={classes.chatIcon}>
                      <IconButton onClick={() => handleSendMessage(senderId)} color="primary">
                        <span>{SandMessageIcon}</span>
                      </IconButton>
                    </div>
                  </div>
                </Paper>
              </div>
          )}
        </Grid>
        <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
      </>
  );
};

export default Messages;
