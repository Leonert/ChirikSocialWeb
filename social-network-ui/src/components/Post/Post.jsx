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
import { red } from "@mui/material/colors";
export default function RecipeReviewCard() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            alt="Вy Sharp"
            src="./img/av3.jpg"
          ></Avatar>
        }
        action={
          <Tooltip title="More">
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        }
        title="Nick name"
        subheader="Data "
      />
      <CardMedia
        component="img"
        height="194"
        image="./img/av2.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Some text to be included in the post
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
            <Badge badgeContent={4} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Retweet">
          <IconButton aria-label="ChatBubbleOutline">
            <Badge badgeContent={4} color="primary">
              <RepeatIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Like">
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={4} color="primary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton aria-label="ChatBubbleOutline">
            <Badge badgeContent={4} color="primary">
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
