import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RepeatIcon from '@mui/icons-material/Repeat';
import {
  Avatar,
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

  console.log(props.originalPost);

  return (
    <Card className={props.classes}>
      {props.replay}

      {props.content != null && (
        <CardHeader
          className={classes.pageItem}
          avatar={<Avatar aria-label="recipe" alt={props.name} src={props.avatar}></Avatar>}
          action={
            <Tooltip title="More">
              <IconButton aria-label="settings" onClick={props.handleClick} className={classes.iconColor}>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          }
          title={props.name}
          subheader={
            <Typography variant="subtitle2" color="#B9CAD3">
              @{props.username}
            </Typography>
          }
        />
      )}

      {props.content && (
        <CardContent className={classes.pageItem}>
          <Typography variant="body2" className={classes.iconColor}>
            {props.content}
          </Typography>
        </CardContent>
      )}
      {props.children}
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
          <Typography mr={2} className={classes.actionTypo}>
            <Typography className={classes.actionNumber}>{props.retweet}</Typography> Retweets
          </Typography>
          <Typography mr={2} className={classes.actionTypo}>
            <Typography className={classes.actionNumber}>{props.reply}</Typography> Quotes
          </Typography>
          <Typography mr={2} className={classes.actionTypo}>
            <Typography className={classes.actionNumber}>{props.like}</Typography> Likes
          </Typography>
          {/* <Typography>{props.retweet} bookmarks</Typography> */}
        </Box>
      )}
      {!props.originalPost && (
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
            <IconButton aria-label="ChatBubbleOutline" className={classes.iconColor} onClick={props.handleClickReplay}>
              <Badge badgeContent={props.reply} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Retweet">
            <IconButton aria-label="ChatBubbleOutline" className={classes.iconColor} onClick={props.handleClickRetweet}>
              <Badge badgeContent={props.retweet} color="primary">
                <RepeatIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Like">
            <IconButton aria-label="add to favorites" className={classes.iconColor} onClick={props.handleClickLike}>
              <Badge badgeContent={props.like} color="primary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
      {/* {props.postPage && (
        <CardActions
          disableSpacing
          className={classes.pageItem}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Tooltip title="Retweet">
            <IconButton aria-label="ChatBubbleOutline" className={classes.iconColor} onClick={props.handleClickRetweet}>
              <Badge badgeContent={props.retweet} color="primary">
                <RepeatIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Reply">
            <IconButton aria-label="ChatBubbleOutline" className={classes.iconColor} onClick={props.handleClickReplay}>
              <Badge badgeContent={props.reply} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Like">
            <IconButton aria-label="add to favorites" className={classes.iconColor} onClick={props.handleClickLike}>
              <Badge badgeContent={props.like} color="primary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </CardActions>
      )} */}
    </Card>
  );
}
