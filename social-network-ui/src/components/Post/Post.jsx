import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RepeatIcon from '@mui/icons-material/Repeat';
import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UsersLikeModal } from '../../components/SocialActionsUser/Like/ListUsersLike/UsersLikeModal';
import { UsersRetweetModal } from '../../components/SocialActionsUser/Retweet/ListUsersRetweet/UsersRetweetModal';
import { handleCustomModal } from '../../features/slices/customModalSlice';
import { handleOpenLikeModal } from '../../features/slices/postDatas/likesSlice';
import { handleOpenRetweetModal } from '../../features/slices/postDatas/retweetsSlice';
import AvatarLink from '../UI/AvatarLink';
import NameLink from '../UI/NameLink';
import { usePostStyle } from './PostStyle';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export default function Post(props) {
  const classes = usePostStyle();

  const dispatch = useDispatch();

  const { isOpenLikeModal } = useSelector((state) => state.likes);
  const { isOpenRetweetModal } = useSelector((state) => state.retweets);

  const handleClickOpenLikesModal = () => {
    dispatch(handleCustomModal(true));
    dispatch(handleOpenLikeModal(true));
  };
  const handleClickOpenRetweetModal = () => {
    dispatch(handleCustomModal(true));
    dispatch(handleOpenRetweetModal(true));
  };

  return (
    <Card className={props.classes}>
      {props.replay}
      {props.content != null && (
        <CardHeader
          className={classes.pageItem}
          avatar={<AvatarLink alt={props.name} src={props.avatar} to={`/${props.username}`} />}
          action={
            <Tooltip title="More">
              <IconButton aria-label="settings" onClick={props.handleClick} className={classes.iconColor}>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          }
          title={<NameLink name={props.name} to={`/${props.username}`} />}
          subheader={
            <Typography variant="subtitle2" color="#B9CAD3">
              @{props.username}
            </Typography>
          }
        />
      )}
      {props.content && !props.postPage && (
        <Link to={`/${props.username}/${props.id}`}>
          <CardContent className={classes.pageItem}>
            <Typography variant="body2" className={classes.iconColor}>
              {props.content}
            </Typography>
          </CardContent>
        </Link>
      )}
      {props.content && props.postPage && (
        <CardContent className={classes.pageItem}>
          <Typography variant="body2" className={classes.iconColor}>
            {props.content}
          </Typography>
        </CardContent>
      )}
      {!props.isReply && props.children}
      {props.image && <CardMedia component="img" image={props.image} alt="Post image" className={classes.iconImg} />}
      {props.postPage && (
        <Typography variant="body2" className={classes.date}>
          {new Date(props.date).toLocaleString('en-US', options)}
        </Typography>
      )}
      {props.postPage && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '5px 15px',
            borderTop: '1px solid #38444D',
            borderBottom: '1px solid #38444D',
          }}
        >
          <Typography onClick={handleClickOpenRetweetModal} mr={2} className={classes.actionTypo}>
            <Typography variant="span" className={classes.actionNumber}>
              {props.retweet}
            </Typography>{' '}
            Retweets
          </Typography>
          <Typography mr={2} className={classes.actionTypo}>
            <Typography variant="span" className={classes.actionNumber}>
              {props.reply}
            </Typography>{' '}
            Quotes
          </Typography>
          <Typography onClick={handleClickOpenLikesModal} mr={2} className={classes.actionTypo}>
            <Typography variant="span" className={classes.actionNumber}>
              {props.like}
            </Typography>{' '}
            Likes
          </Typography>
          <Typography mr={2} className={classes.actionTypo}>
            <Typography variant="span" className={classes.actionNumber}>
              {props.bookmark}
            </Typography>{' '}
            Bookmarks
          </Typography>
        </Box>
      )}

      {props.originalPost ? (
        props.originalPost && props.IdentifierReply ? null : (
          <CardActions
            disableSpacing
            className={classes.pageItem}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '8px 80px',
            }}
          >
            <Tooltip title="Reply">
              <IconButton
                aria-label="ChatBubbleOutline"
                className={props.replayed ? classes.iconActions : classes.iconColor}
                onClick={props.handleClickReplay}
              >
                <Badge badgeContent={props.reply} color="primary">
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Retweet">
              <IconButton
                aria-label="ChatBubbleOutline"
                className={props.retweeted ? classes.iconActions : classes.iconColor}
                onClick={props.handleClickRetweet}
              >
                <Badge badgeContent={props.retweet} color="primary">
                  <RepeatIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Like">
              <IconButton
                aria-label="add to favorites"
                className={props.liked ? classes.iconActions : classes.iconColor}
                onClick={props.handleClickLike}
              >
                <Badge badgeContent={props.like} color="primary">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Bookmarks">
              <IconButton
                aria-label="add to favorites"
                className={props.bookmarked ? classes.iconActions : classes.iconColor}
                onClick={props.handleClickBookmark}
              >
                <Badge badgeContent={props.bookmark} color="primary">
                  <BookmarkBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </CardActions>
        )
      ) : props.originalPost || props.IdentifierOriginal ? null : (
        <CardActions
          disableSpacing
          className={classes.pageItem}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '8px 80px',
          }}
        >
          <Tooltip title="Reply">
            <IconButton
              aria-label="ChatBubbleOutline"
              className={props.replayed ? classes.iconActions : classes.iconColor}
              onClick={props.handleClickReplay}
            >
              <Badge badgeContent={props.reply} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Retweet">
            <IconButton
              aria-label="ChatBubbleOutline"
              className={props.retweeted ? classes.iconActions : classes.iconColor}
              onClick={props.handleClickRetweet}
            >
              <Badge badgeContent={props.retweet} color="primary">
                <RepeatIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Like">
            <IconButton
              aria-label="add to favorites"
              className={props.liked ? classes.iconActions : classes.iconColor}
              onClick={props.handleClickLike}
            >
              <Badge badgeContent={props.like} color="primary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          {!props.isBookmarkPage && (
            <Tooltip title="Bookmarks">
              <IconButton
                aria-label="add to favorites"
                className={props.bookmarked ? classes.iconActions : classes.iconColor}
                onClick={props.handleClickBookmark}
              >
                <Badge badgeContent={props.bookmark} color="primary">
                  <BookmarkBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      )}
      {isOpenLikeModal && <UsersLikeModal />}
      {isOpenRetweetModal && <UsersRetweetModal />}
    </Card>
  );
}
