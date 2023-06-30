import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Badge, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
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

const CardSize = styled(Card)(({ theme, isreplypage }) => ({
  backgroundColor: theme.palette.background.paper + ' !important',

  color: theme.palette.text.primary,
  padding: '20px ',
  boxShadow: 'none !important',
  borderRadius: '10px  ',
  margin: '0',
  ...(isreplypage
    ? { border: `1px solid transparent` }
    : { marginTop: '20px', border: `1px solid ${theme.palette.divider}` }),
}));

const CardHeaderItem = styled(CardHeader)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  fontWeight: 800 + ' !important',
  fontSize: 15 + ' !important',
}));

const IconButtonCloth = styled(IconButton)(({ theme }) => ({
  color: '#fff !important',
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  fontWeight: ' 800  !important',
  fontSize: ' 15  !important',
}));
const TypographyActions = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: '14px !important',
  color: theme.palette.grey[300],
  cursor: 'pointer',
}));
const TypographyNumber = styled(Typography)(({ theme }) => ({
  fontWeight: '700 !important',
  fontSize: '15px !important',
  color: theme.palette.primary.main,
  marginRight: '5px !important',
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
  const { user } = useSelector((state) => state.auth);
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
    <CardSize isreplypage={props.isreplypage}>
      {props.replay}
      {props.content != null && (
        <CardHeaderItem
          avatar={<AvatarLink alt={props.name} avatar={props.profileImage} to={`/${props.username}`} />}
          action={
            user && props.username === user.username ? (
              <Tooltip title="Delete">
                <IconButtonCloth aria-label="settings" onClick={props.handleClickDelete}>
                  <ClearIcon />
                </IconButtonCloth>
              </Tooltip>
            ) : null
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
          <CardContentWrapper>
            <Typography variant="body2" color="#B9CAD3" style={{ overflowWrap: 'break-word' }}>
              {props.content}
            </Typography>
          </CardContentWrapper>
        </Link>
      )}
      {props.content && props.postPage && (
        <CardContentWrapper>
          <Typography variant="body2" color="#B9CAD3">
            {props.content}
          </Typography>
        </CardContentWrapper>
      )}

      {!props.isreplypage && props.children}

      {props.image && (
        <CardMedia
          component="img"
          image={props.image}
          alt="Post image"
          sx={{ maxWidth: '90%', maxHeight: '400px', margin: 'auto', borderRadius: '2%', objectFit: 'contain' }}
        />
      )}
      {props.postPage && (
        <Typography variant="body2" color="#B9CAD3" sx={{ padding: '15px 0 10px 16px' }}>
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
          <TypographyActions onClick={handleClickOpenRetweetModal} mr={2}>
            <TypographyNumber variant="span">{props.retweet}</TypographyNumber>
            Retweets
          </TypographyActions>
          <TypographyActions mr={2}>
            <TypographyNumber variant="span">{props.reply}</TypographyNumber>
            Quotes
          </TypographyActions>
          <TypographyActions onClick={handleClickOpenLikesModal} mr={2}>
            <TypographyNumber variant="span">{props.like}</TypographyNumber>
            Likes
          </TypographyActions>
          <TypographyActions mr={2}>
            <TypographyNumber variant="span">{props.bookmark}</TypographyNumber>
            Bookmarks
          </TypographyActions>
        </Box>
      )}

      {props.originalPost ? (
        props.originalPost && props.IdentifierReply ? null : (
          <CardContentWrapper
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '8px 80px',
            }}
          >
            <Tooltip title="Reply">
              <IconButton
                aria-label="ChatBubbleOutline"
                style={{ color: props.replayed ? '#ec2121 ' : '#B9CAD3' }}
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
                style={{ color: props.retweeted ? '#ec2121 ' : '#B9CAD3' }}
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
                style={{ color: props.liked ? '#ec2121' : '#B9CAD3' }}
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
                style={{ color: props.bookmarked ? '#ec2121' : '#B9CAD3' }}
                onClick={props.handleClickBookmark}
              >
                <Badge badgeContent={props.bookmark} color="primary">
                  <BookmarkBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </CardContentWrapper>
        )
      ) : props.originalPost || props.IdentifierOriginal ? null : (
        <CardContentWrapper
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '8px 80px',
          }}
        >
          <Tooltip title="Reply">
            <IconButton
              aria-label="ChatBubbleOutline"
              style={{ color: props.replayed ? '#ec2121 ' : '#B9CAD3' }}
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
              style={{ color: props.retweeted ? '#ec2121 ' : '#B9CAD3' }}
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
              style={{ color: props.liked ? '#ec2121' : '#B9CAD3' }}
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
                style={{ color: props.bookmarked ? '#ec2121' : '#B9CAD3' }}
                onClick={props.handleClickBookmark}
              >
                <Badge badgeContent={props.bookmark} color="primary">
                  <BookmarkBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
        </CardContentWrapper>
      )}
      {isOpenLikeModal && <UsersLikeModal />}
      {isOpenRetweetModal && <UsersRetweetModal />}
    </CardSize>
  );
}
