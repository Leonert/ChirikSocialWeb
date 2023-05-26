import { Avatar, Button, Grid, IconButton, InputAdornment, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';

import { EmojiIcon, GifIcon, MediaIcon, SandMessageIcon, SearchIcon } from '../../icon';
import { DEFAULT_PROFILE_IMG } from '../../util/url';

import { useMessagesStyles } from './MessagesStyles';
import { PeopleSearchInput } from './PeopleSearchInput/PeopleSearchInput';

import { ChatApi } from "../../services/api/chatApi";
import MessagesModal from "./MessagesModal/MessagesModal";
import {
  fetchChat,
  fetchChatMessages,
  selectChats,
  selectMessages,
  selectSelectedChatId,
  selectText,
  selectVisibleModalWindow,
  sendMessage,
  setMessage,
  setSelectedChatId,
  setText,
  toggleModalWindow
} from "../../features/slices/massagesSlise";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { formatChatMessageDate } from "../../util/formatDate";
import {MessageInput} from "./MessageInput/MessageInput";

const Messages = () => {
  const classes = useMessagesStyles();
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
  const selectedChatId = useSelector(selectSelectedChatId);
  const messages = useSelector(selectMessages);
  console.log(messages)

  const text = useSelector(selectText);

  const visibleModalWindow = useSelector(selectVisibleModalWindow);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = async (event) => {
    event.preventDefault();
    const keyword = event.target.value;
    dispatch(setText(keyword));

    try {
      const userList = await ChatApi.getUserList(keyword);
      dispatch(fetchChat.fulfilled(userList));
    } catch (error) {
      console.error('Error searching users:', error);
    }
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
      console.error('Error fetching chat messages:', error);
    }
  };

  const onSendMessage = async () => {
    if (text !== '') {
      if (selectedChatId === null) {
        console.error('Selected chat is undefined');

        return;
      }

      const selectedChat = chats.find((chat) => chat.id === selectedChatId);
      if (selectedChat) {
        const newMessage = {
          chatId: selectedChatId,
          message: text,
          read: false,
          recipientId: selectedChat.recipientId,
          senderId: selectedChat.senderId,
          timestamp: new Date().toISOString(),
          senderUsername: selectedChat.senderUsername,
          recipientUsername: selectedChat.recipientUsername,
        };

        try {
          const createdMessage = await ChatApi.sendMessage(selectedChatId, newMessage);
          dispatch(sendMessage.fulfilled({ chatId: selectedChatId, message: createdMessage }));

          const updatedMessages = {
            ...messages,
            [selectedChatId]: [...(messages[selectedChatId] || []), createdMessage],
          };
          dispatch(setMessage({ chatId: selectedChatId, message: createdMessage }));

          dispatch(setText(''));
          dispatch(setSelectedChatId(selectedChatId));
          scrollToBottom();
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.error('Selected chat not found');
      }
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

  const handleInputChange = (event) => {
    dispatch(setText(event.target.value));
  };

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };
  const handleExitClick = () => {
    dispatch(setSelectedChatId(undefined));
    dispatch(setText(''));
    // Скидання стану або перенаправлення на іншу сторінку
  };

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
                      Direct Messages are private conversations between you and other people on Twitter. Share Tweets, media, and more!
                    </div>
                    <Button onClick={onOpenModalWindow} className={classes.messagesButton} variant="contained" color="primary">
                      Start a conversation
                    </Button>
                  </>
              ) : (
                  <>
                    <div className={classes.searchWrapper}>
                      <PeopleSearchInput
                          placeholder="Explore for people and groups"
                          variant="outlined"
                          onChange={handleSearchChange}
                          value={text}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">{SearchIcon}</InputAdornment>,
                          }}
                      />
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
                                      src={(group.chats[0]?.avatar?.src || '') ? group.chats[0].avatar.src : DEFAULT_PROFILE_IMG}
                                  />
                                  <div style={{ flex: 1 }}>
                                    <div className={classes.userHeader}>
                                      <div>
                                        <Typography className={classes.userFullName}>{group.chats[0]?.fullName || ''}</Typography>
                                        <Typography className={classes.username}>@{group.chats[0]?.senderUsername || ''}</Typography>
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
                    <Button onClick={onOpenModalWindow} className={classes.chatInfoButton} variant="contained" color="primary">
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
                      <Typography className={classes.username}>@{messages?.senderUsername || ''}</Typography>

                      <IconButton  onClick={handleExitClick} color="primary">
                        <span>back</span>

                      </IconButton>
                    </div>

                  </Paper>
                  <div className={classes.chatMessages}>
                    {Array.isArray(messages?.messages) &&
                        messages.messages.map((message, index) => {
                          const previousMessage = messages[selectedChatId]?.messages[index - 1];
                          const currentMessageDate = new Date(message.timestamp);
                          const previousMessageDate = previousMessage ? new Date(previousMessage.timestamp) : null;
                          const showDateSeparator =
                              previousMessageDate &&
                              !isValidDate(previousMessageDate) &&
                              isValidDate(currentMessageDate);

                          return (
                              <React.Fragment key={message.messageId}>
                                {showDateSeparator && (
                                    <div className={classes.dateSeparator}>{formatChatMessageDate(currentMessageDate)}</div>
                                )}
                                <div
                                    className={classNames(classes.messageContainer, {
                                      [classes.ownMessage]: message.senderId,
                                    })}
                                >
                                  {message.senderId ? (
                                      <Avatar className={classes.messageAvatar} src={DEFAULT_PROFILE_IMG} />
                                  ) : null}
                                  <div
                                      className={classNames(classes.messageContent, {
                                        [classes.ownMessageContent]: message.senderId,
                                      })}
                                  >
                                    <Typography className={classes.myMessage}>{message.message}</Typography>
                                    <Typography className={classes.messageTimestamp}>
                                      {formatChatMessageDate(currentMessageDate)}
                                    </Typography>
                                  </div>
                                </div>
                              </React.Fragment>
                          );
                        })}
                    <div ref={chatEndRef} />
                  </div>
                  <div className={classes.chatFooter}>
                    <div className={classes.chatIcon}>
                      <IconButton color="primary">
                        <span>{MediaIcon}</span>
                      </IconButton>
                    </div>
                    <div className={classes.chatIcon}>
                      <IconButton color="primary">
                        <span>{GifIcon}</span>
                      </IconButton>
                    </div>
                    <div className={classes.messageInputWrapper}>
                      <MessageInput
                          multiline
                          value={text}
                          onChange={handleInputChange}
                          variant="outlined"
                          placeholder="Start a new message"
                          onKeyDown={handleKeyDown} // Доданий обробник події натискання клавіші
                      />
                      <div className={classes.emojiIcon}>
                        <IconButton color="primary">
                          <span>{EmojiIcon}</span>
                        </IconButton>
                      </div>
                      <div style={{ marginLeft: 8 }} className={classes.chatIcon}>
                        <IconButton onClick={onSendMessage} color="primary">
                          <span>{SandMessageIcon}</span>
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
          )}
        </Grid>

        {visibleModalWindow && <MessagesModal onClose={onCloseModalWindow} />}
      </>

  );
};

export default Messages;