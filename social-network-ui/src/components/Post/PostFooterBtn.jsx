import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Badge, CardActions, IconButton, Tooltip } from '@mui/material';
import React from 'react';

import { usePostStyle } from './PostStyle';

const PostFooterBtn = (props) => {
  const classes = usePostStyle();

  return (
    <CardActions
      className={classes.pageItem}
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 80px',
      }}
    >
      <Tooltip title="Reply">
        <IconButton
          aria-label="Reply"
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
          aria-label="Retweet"
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
          aria-label="add to Like"
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
          aria-label="add to Bookmarks"
          className={props.bookmarked ? classes.iconActions : classes.iconColor}
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
