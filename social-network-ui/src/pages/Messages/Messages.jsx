import React, { Fragment, useRef, useState} from "react";
import {Avatar, Grid, List, ListItem, Paper, Typography} from "@material-ui/core";
import {useMessagesStyles} from "./MessagesStyles";
import Button from "@material-ui/core/Button";
import {MessageInput} from "./MessageInput/MessageInput";
import {CheckIcon, EmojiIcon, GifIcon, MediaIcon} from "../../icon";
import IconButton from "@material-ui/core/IconButton";
import MessagesModal from "./MessagesModal/MessagesModal";
import {formatChatMessageDate, formatDate} from "../../util/formatDate";
import {Link} from "react-router-dom";
import {DEFAULT_PROFILE_IMG} from "../../util/url";



const Messages = () => {
    const classes = useMessagesStyles();
    const chatEndRef = useRef(null);
    const [message, setMessage] = useState("");
    const [visibleModalWindow, setVisibleModalWindow] = useState(false);
    const [participant] = useState();

    const onOpenModalWindow = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };


    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <div className={classes.messagesContainer}>
                    <Paper variant="outlined">
                        <Paper className={classes.header}>
                            <div>
                                <Typography variant="h6">
                                    Messages
                                </Typography>
                            </div>
                        </Paper>
                            <>
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
                            </>
                            <>
                                <div className={classes.searchWrapper}>

                                </div>
                                <List component="nav" className={classes.list} aria-label="main mailbox folders">

                                        <ListItem button className={classes.listItem}>
                                            <div className={classes.userWrapper}>
                                                <Avatar
                                                    className={classes.userAvatar}
                                                />
                                                <div style={{flex: 1}}>
                                                    <div className={classes.userHeader}>
                                                        <div style={{width: 300}}>
                                                            <Typography className={classes.userFullName}>
                                                                test
                                                            </Typography>
                                                            <Typography className={classes.username}>
                                                                test
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListItem>
                                </List>
                            </>
                    </Paper>
                </div>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                {(participant?.id === undefined) ? (
                    <div className={classes.chatContainer}>
                        <Paper variant="outlined">
                            <div className={classes.chatInfoWrapper}>
                                <div className={classes.chatInfoTitle}>
                                    You don’t have a message selected
                                </div>
                                <div className={classes.chatInfoText}>
                                    Choose one from your existing messages, or start a new one.
                                </div>
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
                                <div style={{flex: 1}}>
                                    <Typography variant="h6">{participant?.fullName}</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        @{participant?.username}
                                    </Typography>
                                </div>
                            </Paper>
                            <Paper className={classes.chat}>
                                <Fragment key={message.id}>
                                    <div className={classes.tweetContainer}>
                                                    <Link to={`/home/tweet/`}>
                                                        <div className={classes.tweetWrapper}>
                                                            <div className={classes.tweetUserInfoWrapper}>
                                                                <Avatar
                                                                    className={classes.tweetAvatar}
                                                                />
                                                                <span className={classes.tweetUserFullName}>
                                                                    {message.user.fullName}
                                                                </span>
                                                                <span className={classes.tweetUsername}>
                                                                    @{message.user.username}
                                                                </span>
                                                                <span className={classes.tweetUsername}>·</span>
                                                                <span className={classes.tweetUsername}>
                                                                    {formatDate(new Date(message.dateTime))}
                                                                </span>
                                                            </div>
                                                            <span>{message.text}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            {message.text && (
                                                <div className={(
                                                    classes.myMessage
                                                )}>
                                                    <span>{message.text}</span>
                                                </div>
                                            )}
                                            <div className={classes.myMessageDate}>
                                                <span>{CheckIcon}</span>
                                                <span>{formatChatMessageDate(new Date(message.date))}</span>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment key={message.id}>
                                            <div className={classes.participantContainer}>
                                                <Avatar
                                                    className={classes.participantAvatar}
                                                />
                                                <div>
                                                    {message && (
                                                        <div className={classes.participantTweetCon}>
                                                            <Link to={`/home/tweet/${message.id}`}>
                                                                <div className={classes.participantTweetWrapper}>
                                                                    <div className={classes.participantTweetInfoWrapper}>
                                                                        <Avatar
                                                                            className={classes.participantTweetAvatar}
                                                                            src={(message.user.avatar?.src) ? (
                                                                                message.user.avatar?.src
                                                                            ) : (
                                                                                DEFAULT_PROFILE_IMG
                                                                            )}
                                                                        />
                                                                        <span className={classes.participantTweetFullName}>
                                                                        {message.user.fullName}
                                                                    </span>
                                                                        <span className={classes.participantTweetUsername}>
                                                                        @{message.user.username}
                                                                    </span>
                                                                        <span
                                                                            className={classes.participantTweetUsername}>·</span>
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
                                                        <div className={(
                                                            classes.participantMessage
                                                        )}>
                                                            <span>{message.text}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={classes.participantMessageDate}>
                                            </div>
                                        </Fragment>
                                    )
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
                                        <span>{GifIcon}</span>
                                    </IconButton>
                                </div>
                                <MessageInput
                                    multiline
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    variant="outlined"
                                    placeholder="Start a new message"
                                />
                                <div className={classes.emojiIcon}>
                                    <IconButton color="primary">
                                        <span>{EmojiIcon}</span>
                                    </IconButton>
                                </div>
                                <div style={{marginLeft: 8}} className={classes.chatIcon}>
                                    <IconButton  color="primary">
                                        <span>test</span>
                                    </IconButton>
                                </div>
                            </Paper>
                        </Paper>
                    </div>
                )}
            </Grid>
            <MessagesModal
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}/>
        </>
    );
};

export default Messages;
