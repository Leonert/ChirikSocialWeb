import { SearchIcon } from '../../icon';
import { MessagesModalInput } from './MessagesModalInput/MessagesModalInput';
import { useMessagesModalStyles } from './MessagesModalStyles';
import MessagesModalUser from './MessagesModalUser/MessagesModalUser';
import {useDispatch, useSelector} from "react-redux";
import axiosIns from "../../axiosInstance";
import {addResult, removeResult} from "../../features/slices/searchSlice";
import React, {useState} from "react";
import {IconButton, InputAdornment, List, ListItem} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import CloseButton from "../AddTweetModal/AddTweetForm/CloseButton/CloseButton";
import {addChat} from "../../features/slices/massagesSlise";



const MessagesModal = ({ visible, onClose }) => {
  const classes = useMessagesModalStyles();
  const searchResult = useSelector((state) => state.search.searchResult);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const authorId = useSelector((state) => state.messages.authorId);

  const handleInputChange = (event) => {
    axiosIns.get(`/api/search/users?q=${event.target.value}`, {}).then((response) => {
      event.target.value === '' ? dispatch(removeResult()) : dispatch(addResult(response.data));
    });
    setSearchText(event.target.value);
  };

  const handleListItemClick = (user) => {
    setSelectedUser(user);

  };


  const handleCreateChat = () => {
    if (selectedUser) {
      const messageDto = {
        messageId: null,
        isRead: false,
        message: '',
        timestamp: null,
        recipientId: selectedUser.id,
        senderId: authorId,
        chatId: null,
        senderUsername: '',
        recipientUsername: selectedUser.username,
      };
      const chatDto = {
        chatId: null,
        messages: [messageDto]
      };

      axiosIns
          .post('/api/messages/chats/create', { messageDto, chatDto })
          .then((response) => {
            const createdChatDto = response.data;
            dispatch(addChat(createdChatDto));
            onClose(createdChatDto);
          })
          .catch((error) => {
            alert('An error occurred while creating chat. Please try again later.'+ error);
          });
    }
  };


  return (
      <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.header}>
          <IconButton onClick={onClose} color="secondary" aria-label="close">
            <CloseButton color="#fff" />
          </IconButton>
          <span className={classes.headerMessage}>New message</span>
          <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleCreateChat}
              disabled={!selectedUser}
          >
            Next
          </Button>
        </DialogTitle>

        <DialogContent className={classes.content}>
          <form>
            <MessagesModalInput
                fullWidth
                placeholder="Explore people"
                onChange={handleInputChange}
                variant="outlined"
                value={searchText}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{SearchIcon}</InputAdornment>,
                }}
            />
          </form>
          <div className={classes.divider} />
          <List component="nav" aria-label="main mailbox folders">
            {searchResult.map((user) => (
                <ListItem
                    key={user.id}
                    button
                    selected={selectedUser && selectedUser.id === user.id}
                    onClick={() => handleListItemClick(user)}
                >
                  <MessagesModalUser user={user} />
                </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
  );
};

export default MessagesModal;