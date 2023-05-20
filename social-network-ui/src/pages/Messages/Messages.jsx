import { Avatar, Button, Grid, IconButton, InputAdornment, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';

import { MediaIcon, SandMessageIcon, SearchIcon} from '../../icon';
import { DEFAULT_PROFILE_IMG} from '../../util/url';

import { useMessagesStyles } from './MessagesStyles';
import { PeopleSearchInput } from './PeopleSearchInput/PeopleSearchInput';

import {format} from "date-fns";
import {ChatApi} from "../../services/api/chatApi";
import {MessageInput} from "./MessageInput/MessageInput";
import MessagesModal from "./MessagesModal/MessagesModal";
import {
  fetchChat,
  fetchChatMessages,
  selectChats,
  selectMessages,
  selectParticipant,
  selectSelectedChatId,
  selectText, selectVisibleModalWindow, sendMessage, setSelectedChatId, setText, toggleModalWindow
} from "../../features/slices/massagesSlise";
import {useDispatch, useSelector} from "react-redux";
import {formatChatMessageDate} from "../../util/formatDate";
import classNames from "classnames";


const Messages = () => {
  const classes = useMessagesStyles();
  const chatEndRef = useRef(null);
  const dispatch = useDispatch();

  const chats = useSelector(selectChats);
  const messages = useSelector(selectMessages);
  console.log(chats,1)
  const selectedChatId = useSelector(selectSelectedChatId);
  const text = useSelector(selectText);
  const participant = useSelector(selectParticipant);
  const visibleModalWindow = useSelector(selectVisibleModalWindow);
  const [messageText, setMessageText] = useState('');

  const handleSearchChange = async (event) => {
    event.preventDefault(); // Остановка стандартного поведения формы
    const keyword = event.target.value;
    dispatch(setText(keyword));

    try {
      const userList = await ChatApi.getUserList(keyword);
      dispatch(fetchChat(userList));
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onOpenModalWindow = () => {
    dispatch(toggleModalWindow());
  };

  const onCloseModalWindow = () => {
    dispatch(toggleModalWindow());
  };
  const handleListItemClick = async (chatId, message) => {
    dispatch(setSelectedChatId(chatId));
    try {
      await dispatch(fetchChatMessages(chatId));
      const chatMessages = await ChatApi.getChatMessages(chatId);
      const lastMessage = chatMessages.message;
      scrollToBottom();
    } catch (e) {
      console.error(e);
    }
  };
  console.log(messages)


  const onSendMessage = async () => {
    if (text !== '') {
      let selectedChat = chats.find((chat) => chat.id === selectedChatId);
      if (selectedChat) {
        const newMessage = {
          id: selectedChat.id,
          date: new Date().toISOString(), // Используем ISO-строку для даты
          text: text,
          isRead: false,
        };

        try {
          const createdMessage = await ChatApi.sendMessage(newMessage);
          dispatch(sendMessage(createdMessage));
          dispatch(setText(''));
          dispatch(setSelectedChatId(selectedChatId));
          scrollToBottom();
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.error('Selected chat is undefined');
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

  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  return (
      <>
        <Grid className={classes.grid} md={4} item>
          <div className={classes.messagesContainer}>
            <Paper variant="outlined">
              <Paper className={classes.header}>
                <div>
                  <Typography  variant="h6">Messages</Typography>
                </div>
              </Paper>
              {chats.length === 0 ? (
                  <>
                    <div className={classes.messagesTitle}>Send a message, get a message</div>
                    <div className={classes.messagesText}>
                      Direct Messages are private conversations between you and other people on Twitter. Share Tweets,
                      media, and more!
                    </div>
                    <Button
                        onClick={onOpenModalWindow}
                        className={classes.messagesButton}
                        variant="contained"
                        color="primary"
                    >
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
                      {chats.map((chat) => (
                          <ListItem
                              key={chat && chat.id}
                              button
                              className={classes.listItem}
                              id={participant && participant.id === chat.id ? 'selected' : ''}
                              selected={participant && participant.id === chat.id}
                              onClick={() => handleListItemClick(chat.id)}
                          >
                            <div className={classes.userWrapper}>
                              <Avatar
                                  className={classes.userAvatar}
                                  src={
                                    chat.avatar?.src
                                        ? chat.avatar.src
                                        : DEFAULT_PROFILE_IMG
                                  }
                              />
                              <div style={{ flex: 1 }}>
                                <div className={classes.userHeader}>
                                  <div>
                                    <Typography className={classes.userFullName}>
                                      {chat.fullName}
                                    </Typography>
                                    <Typography className={classes.username}>
                                      @{chat.username}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ListItem>
                      ))}
                    </List>
                  </>
              )}
            </Paper>
          </div>
        </Grid>
        <Grid className={classes.grid} md={6} item>
          {participant?.id === undefined ? (
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
                    <Avatar
                        className={classes.chatAvatar}
                        src={participant?.avatar?.src ? participant?.avatar.src : DEFAULT_PROFILE_IMG}
                    />
                    <div style={{ flex: 1 }}>
                      <Typography variant="h6">{participant?.fullName}</Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        @{participant?.username}
                      </Typography>
                    </div>
                  </Paper>
                  <Paper className={classes.chat}>
                    {messages.map((message) =>  (
                        <React.Fragment key={message}>
                          {message.author ? (
                              <div className={classes.tweetContainer}>
                                <div className={classes.tweetWrapper}>
                                  <div className={classes.tweetUserInfoWrapper}>
                                    <Avatar
                                        className={classes.tweetAvatar}
                                        src={message.author.avatar?.src || DEFAULT_PROFILE_IMG}
                                    />
                                    <span className={classes.tweetUserFullName}>{message.author.fullName}</span>
                                    <span className={classes.tweetUsername}>@{message.author.username}</span>
                                    <span className={classes.tweetTimestamp}>

                                      {isValidDate(message.timestamp)
                                          ? format(new Date(message.timestamp), 'dd/MM/yyyy HH:mm:ss')
                                          : ''}
                                    </span>
                                  </div>
                                  {message.text && (
                                      <div className={classNames(
                                          classes.myMessage,
                                          message.tweet ? classes.myMessageWithTweet : classes.myMessageCommon
                                      )}>
                                        <span>{message.text}</span>
                                      </div>
                                  )}
                                </div>
                              </div>
                          ) : (
                              <div className={classes.messageContainer}>
                                <div className={classes.message}>
                                  <div className={classes.messageText}>{message.message}</div>
                                  <div className={classes.messageTimestamp}>
                                    {isValidDate(message.timestamp)
                                        ? formatChatMessageDate(new Date(message.timestamp))
                                        : ''}
                                  </div>
                                </div>
                              </div>
                          )}
                        </React.Fragment>
                        ))}
                    <div ref={chatEndRef} />
                  </Paper>

                  <Paper className={classes.chatFooter}>
                    <div className={classes.chatIcon}>
                      <IconButton color="primary">
                        <span>{MediaIcon}</span>
                      </IconButton>
                    </div>
                    <MessageInput
                        multiline
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        variant="outlined"
                        placeholder="Start a new message"
                    />
                    <div style={{ marginLeft: 8 }} className={classes.chatIcon}>
                      <IconButton onClick={onSendMessage} color="primary">
                        <span>{SandMessageIcon}</span>
                      </IconButton>
                    </div>
                  </Paper>
                </Paper>
              </div>
          )}
        </Grid>
        <MessageInput
            multiline
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            variant="outlined"
            placeholder="Start a new message"
        />
      </>
  );

};

export default Messages;