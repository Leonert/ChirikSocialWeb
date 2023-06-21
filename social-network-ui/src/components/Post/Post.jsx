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
import { styled } from '@mui/material/styles';
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

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  fontWeight: 800 + ' !important',
  fontSize: 15 + ' !important',
}));
const CustomCardContent = styled(CardContent)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  fontWeight: 800 + ' !important',
  fontSize: 15 + ' !important',
}));
const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  maxWidth: '90%',
  margin: 'auto',
  borderRadius: '2%',
}));

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export default function Post(props) {
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
        <CustomCardHeader
          avatar={<AvatarLink alt={props.name} avatar={props.profileImage} to={`/${props.username}`} />}
          action={
            <Tooltip title="More">
              <IconButton aria-label="settings" onClick={props.handleClick} className="iconColor">
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
          <CustomCardContent>
            <Typography variant="body2" className="iconColor">
              {props.content}
            </Typography>
          </CustomCardContent>
        </Link>
      )}
      {props.content && props.postPage && (
        <CustomCardContent>
          <Typography variant="body2" className="iconColor">
            {props.content}
          </Typography>
        </CustomCardContent>
      )}

      {!props.isReplyPage && props.children}

      {props.image && <CustomCardMedia component="img" image={props.image} alt="Post image" />}
      {props.postPage && (
        <Typography variant="body2" sx={{ padding: '15px 0 10px 16px', color: '#8a9da8' }}>
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
          <Typography
            onClick={handleClickOpenRetweetModal}
            mr={2}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              fontSize: '14px !important',
              color: (theme) => theme.palette.grey[300],
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontWeight: '700 !important',
                fontSize: '15px !important',
                color: (theme) => theme.palette.primary.main,
                marginRight: '5px !important',
              }}
            >
              {props.retweet}
            </Typography>
            Retweets
          </Typography>
          <Typography
            mr={2}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              fontSize: '14px !important',
              color: (theme) => theme.palette.grey[300],
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontWeight: '700 !important',
                fontSize: '15px !important',
                color: (theme) => theme.palette.primary.main,
                marginRight: '5px !important',
              }}
            >
              {props.reply}
            </Typography>
            Quotes
          </Typography>
          <Typography
            onClick={handleClickOpenLikesModal}
            mr={2}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              fontSize: '14px !important',
              color: (theme) => theme.palette.grey[300],
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontWeight: '700 !important',
                fontSize: '15px !important',
                color: (theme) => theme.palette.primary.main,
                marginRight: '5px !important',
              }}
            >
              {props.like}
            </Typography>
            Likes
          </Typography>
          <Typography
            mr={2}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              fontSize: '14px !important',
              color: (theme) => theme.palette.grey[300],
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontWeight: '700 !important',
                fontSize: '15px !important',
                color: (theme) => theme.palette.primary.main,
                marginRight: '5px !important',
              }}
            >
              {props.bookmark}
            </Typography>
            Bookmarks
          </Typography>
        </Box>
      )}

      {props.originalPost ? (
        props.originalPost && props.IdentifierReply ? null : (
          <CardActions
            disableSpacing
            sx={{
              color: (theme) => theme.palette.text.primary,
              backgroundColor: (theme) => theme.palette.background.paper,
              fontWeight: 800 + ' !important',
              fontSize: 15 + ' !important',
              display: 'flex',
              justifyContent: 'space-around',
              padding: '8px 80px',
            }}
          >
            <Tooltip title="Reply">
              <IconButton
                aria-label="ChatBubbleOutline"
                className={props.replayed ? 'iconActions' : 'iconColor'}
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
                className={props.retweeted ? 'iconActions' : 'iconColor'}
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
                className={props.liked ? 'iconActions' : 'iconColor'}
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
                className={props.bookmarked ? 'iconActions' : 'iconColor'}
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
          sx={{
            color: (theme) => theme.palette.text.primary,
            backgroundColor: (theme) => theme.palette.background.paper,
            fontWeight: 800 + ' !important',
            fontSize: 15 + ' !important',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '8px 80px',
          }}
        >
          <Tooltip title="Reply">
            <IconButton
              aria-label="ChatBubbleOutline"
              className={props.replayed ? 'iconActions' : 'iconColor'}
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
              className={props.retweeted ? 'iconActions' : 'iconColor'}
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
              className={props.liked ? 'iconActions' : 'iconColor'}
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
                className={props.bookmarked ? 'iconActions' : 'iconColor'}
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
