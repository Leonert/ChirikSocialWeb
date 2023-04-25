import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Badge,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
export default function Post(props) {
  return (
    <Card
      sx={{
        borderBottom: "1px solid #1e2028",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            // sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            alt={props.name}
            src={props.avatar}
          ></Avatar>
        }
        action={
          <Tooltip title="More">
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        }
        title={props.name}
        subheader={props.data}
      />
      {<CardMedia component="img" image={props.image} alt="Post" />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-around",
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
        <Tooltip title="View">
          <IconButton aria-label="ChatBubbleOutline">
            <Badge badgeContent={props.view} color="primary">
              <EqualizerIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
