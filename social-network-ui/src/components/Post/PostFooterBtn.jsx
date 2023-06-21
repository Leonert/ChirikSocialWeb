import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Badge, CardActions, IconButton, Tooltip } from '@mui/material';
import React from 'react';

const PostFooterBtn = (props) => {
  return (
    <CardActions
      disableSpacing
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 80px',
        color: (theme) => theme.palette.text.primary,
        backgroundColor: (theme) => theme.palette.background.paper,
        fontWeight: 800 + ' !important',
        fontSize: 15 + ' !important',
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
  );
};

export default PostFooterBtn;
