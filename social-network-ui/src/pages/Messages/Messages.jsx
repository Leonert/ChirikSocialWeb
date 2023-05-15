import { Avatar, Button, Grid, IconButton, InputAdornment, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';

import { EmojiIcon, MediaIcon, SandMessageIcon, SearchIcon} from '../../icon';
import { DEFAULT_PROFILE_IMG} from '../../util/url';
import { MessageInput } from './MessageInput/MessageInput';
import MessagesModal from './MessagesModal/MessagesModal';
import { useMessagesStyles } from './MessagesStyles';
import { PeopleSearchInput } from './PeopleSearchInput/PeopleSearchInput';
import {ChatApi} from "../../services/api/chatApi";
import {formatDistanceToNow} from "date-fns";


const Messages = () => {
  const classes = useMessagesStyles();
  const chatEndRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [text, setText] = useState('');
  const [participant, setParticipant] = useState(null);
  const [visibleModalWindow, setVisibleModalWindow] = useState(false);
  const [groupChatId, setGroupChatId] = useState(null);


  useEffect(() => {
    getChats();
    scrollToBottom();
  }, []);


  const getChats = async () => {
    try {
      const chatList = await ChatApi.getUserChats();
      setChats(chatList);
    } catch (error) {
      console.error('Error fetching user chats:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onOpenModalWindow = () => {
    setVisibleModalWindow(true);
  };

  const onCloseModalWindow = () => {
    setVisibleModalWindow(false);
  };

  const handleListItemClick = async (chatId) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    setSelectedChatId(chatId);
    setParticipant(selectedChat);

    try {
      const chatMessages = await ChatApi.getChatMessages(chatId);
      setMessages(chatMessages);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const onSendMessage = async () => {
    if (text !== '') {
      let selectedChat;
      if (groupChatId) {
        selectedChat = await ChatApi.createChat(selectedChatId);
      } else {
        selectedChat = chats.find((chat) => chat.id === selectedChatId);
      }

      const newMessage = {
        id: 100,
        date: new Date(),
        text,
        isRead: false,
        timestamp: new Date().toISOString(),
        participantId: selectedChat.id,
      };

      console.log(newMessage);
      try {
        const createdMessage = await ChatApi.sendMessage(newMessage);
        setMessages((prevMessages) => [...prevMessages, createdMessage]);
        setText('');
        setSelectedChatId(createdMessage.participantId);
        setParticipant(createdMessage);
        scrollToBottom();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
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
                          onChange={(event) => setText(event.target.value)}
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
                                    chat.id
                                        ? chat.avatar?.src
                                            ? chat.avatar.src
                                            : DEFAULT_PROFILE_IMG
                                        : chat.avatar?.src
                                            ? chat.avatar.src
                                            : DEFAULT_PROFILE_IMG
                                  }
                              />
                              <div style={{ flex: 1 }}>
                                <div className={classes.userHeader}>
                                  <div style={{ width: 300 }}>
                                    <Typography className={classes.userFullName}>
                                      {chat.id ? chat.fullName : chat.fullName}
                                    </Typography>
                                    <Typography className={classes.username}>
                                      {chat.id ? '@' + chat.username : '@' + chat.username}
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
                    { Array.isArray(messages) &&
                        messages.map((message) => (
                            <React.Fragment key={message.id}>
                              {message && message.author && message.author.id ? (
                                  <div className={classes.tweetContainer}>
                                    <Link to={`/home/tweet/${message.id}`}>
                                      <div className={classes.tweetWrapper}>
                                        <div className={classes.tweetUserInfoWrapper}>
                                          <Avatar
                                              className={classes.tweetAvatar}
                                              src={
                                                message.user.avatar?.src ? message.user.avatar?.src : DEFAULT_PROFILE_IMG
                                              }
                                          />
                                          <span className={classes.tweetUserFullName}>{message.user.fullName}</span>
                                          <span className={classes.tweetUsername}>@{message.user.username}</span>
                                          <span className={classes.tweetTimestamp}>
                              {isValidDate(message.timestamp)
                                  ? formatDistanceToNow(new Date(message.timestamp))
                                  : ''}
                            </span>
                                        </div>
                                        <div className={classes.tweetText}>{message.text}</div>
                                      </div>
                                    </Link>
                                  </div>
                              ) : (
                                  <div className={classes.messageContainer}>
                                    <div className={classes.message}>
                                      <div className={classes.messageText}>{message.text}</div>
                                      <div className={classes.messageTimestamp}>
                                        {isValidDate(message.timestamp)
                                            ? formatDistanceToNow(new Date(message.timestamp))
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
                    <div className={classes.chatIcon}>
                      <IconButton color="primary">
                        <span>{EmojiIcon}</span>
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
        <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
      </>

  );
};

export default Messages;