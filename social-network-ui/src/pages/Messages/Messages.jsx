import { Avatar, Button, Grid, IconButton, InputAdornment, List, ListItem, Paper, Typography } from '@mui/material';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CheckIcon, EmojiIcon, MediaIcon, SandMessageIcon, SearchIcon } from '../../icon';
import { formatChatMessageDate, formatDate } from '../../util/formatDate';
import { DEFAULT_PROFILE_IMG } from '../../util/url';
import { MessageInput } from './MessageInput/MessageInput';
import MessagesModal from './MessagesModal/MessagesModal';
import { useMessagesStyles } from './MessagesStyles';
import { PeopleSearchInput } from './PeopleSearchInput/PeopleSearchInput';

const Messages = () => {
  const classes = useMessagesStyles();
  const chatEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [visibleModalWindow, setVisibleModalWindow] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [text, setText] = useState('');
  const [chat, setChat] = useState(null);

  const onOpenModalWindow = () => {
    setVisibleModalWindow(true);
  };

  const onCloseModalWindow = () => {
    setVisibleModalWindow(false);
  };

  const handleListItemClick = (chat) => {
    setParticipant(chat);
    setChat(chat);
  };

  const onSendMessage = () => {};

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
            {message.length === 0 ? (
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
                  {(chat) => (
                    <ListItem
                      key={chat.id}
                      button
                      className={classes.listItem}
                      id={participant?.id === chat.id ? 'selected' : ''}
                      selected={participant?.id === chat.id}
                      onClick={() => handleListItemClick(chat)}
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
                  )}
                </List>
              </>
            )}
          </Paper>
        </div>
      </Grid>
      <Grid className={classes.grid} md={5} item>
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
                {(message) =>
                  message.author.id ? (
                    <React.Fragment key={message.id}>
                      {message && (
                        <div className={classes.tweetContainer}>
                          <Link to={`/home/tweet/${message.id}`}>
                            <div className={classes.tweetWrapper}>
                              <div className={classes.tweetUserInfoWrapper}>
                                <Avatar
                                  className={classes.tweetAvatar}
                                  src={message.user.avatar?.src ? message.user.avatar?.src : DEFAULT_PROFILE_IMG}
                                />
                                <span className={classes.tweetUserFullName}>{message.user.fullName}</span>
                                <span className={classes.tweetUsername}>@{message.user.username}</span>
                                <span className={classes.tweetUsername}>·</span>
                                <span className={classes.tweetUsername}>{formatDate(new Date(message.dateTime))}</span>
                              </div>
                              <span>{message.text}</span>
                            </div>
                          </Link>
                        </div>
                      )}
                      {message.text && (
                        <div
                          className={classNames(
                            classes.myMessage,
                            message ? classes.myMessageWithTweet : classes.myMessageCommon
                          )}
                        >
                          <span>{message.text}</span>
                        </div>
                      )}
                      <div className={classes.myMessageDate}>
                        <span>{CheckIcon}</span>
                        <span>{formatChatMessageDate(new Date(message.date))}</span>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={message.id}>
                      <div className={classes.participantContainer}>
                        <Avatar
                          className={classes.participantAvatar}
                          src={
                            chat?.id
                              ? chat?.avatar?.src
                                ? chat?.avatar.src
                                : DEFAULT_PROFILE_IMG
                              : chat?.avatar?.src
                              ? chat?.avatar.src
                              : DEFAULT_PROFILE_IMG
                          }
                        />
                        <div>
                          {message && (
                            <div className={classes.participantTweetContainer}>
                              <Link to={`/home/tweet/${message.id}`}>
                                <div className={classes.participantTweetWrapper}>
                                  <div className={classes.participantTweetInfoWrapper}>
                                    <Avatar
                                      className={classes.participantTweetAvatar}
                                      src={message.user.avatar?.src ? message.user.avatar?.src : DEFAULT_PROFILE_IMG}
                                    />
                                    <span className={classes.participantTweetFullName}>{message.user.fullName}</span>
                                    <span className={classes.participantTweetUsername}>@{message.user.username}</span>
                                    <span className={classes.participantTweetUsername}>·</span>
                                    <span className={classes.participantTweetUsername}>
                                      {formatDate(new Date(message.dateTime))}
                                    </span>
                                  </div>
                                  <span>{message.text}</span>
                                </div>
                              </Link>
                            </div>
                          )}
                          {message.text && (
                            <div
                              className={classNames(
                                classes.participantMessage,
                                message ? classes.participantMessageWithTweet : classes.participantMessageCommon
                              )}
                            >
                              <span>{message.text}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={classes.participantMessageDate}>
                        {formatChatMessageDate(new Date(message.date))}
                      </div>
                    </React.Fragment>
                  )
                }
                <div ref={chatEndRef}></div>
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
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
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
