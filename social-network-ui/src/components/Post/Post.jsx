import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RepeatIcon from '@mui/icons-material/Repeat';
import {
  Avatar,
  Badge,
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

export default function Post(props) {
  return (
    <Card
      sx={{
        borderBottom: '1px solid #1e2028',
      }}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe" alt={props.name} src={props.avatar}></Avatar>}
        action={
          <Tooltip title="More">
            <IconButton aria-label="settings" onClick={props.handleClick}>
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        }
        title={props.name}
        subheader={props.data}
      />
      {props.image && <CardMedia component="img" image={props.image} alt="Post" />}
      {props.content && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.content}
          </Typography>
        </CardContent>
      )}
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Tooltip title="Replay">
          <IconButton aria-label="ChatBubbleOutline">
            <Badge badgeContent={props.replay} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Retweet">
          <IconButton aria-label="ChatBubbleOutline">
            <Badge badgeContent={props.retweet} color="primary">
              <RepeatIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Like">
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={props.like} color="primary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
