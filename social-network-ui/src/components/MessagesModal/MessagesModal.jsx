import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
} from '@material-ui/core';


import { SearchIcon } from '../../icon';
import { MessagesModalInput } from './MessagesModalInput/MessagesModalInput';
import { useMessagesModalStyles } from './MessagesModalStyles';
import MessagesModalUser from './MessagesModalUser/MessagesModalUser';
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import axiosIns from "../../axiosInstance";
import {addResult, removeResult} from "../../features/slices/searchSlice";
import {useState} from "react";

const MessagesModal = ({ visible, onClose }) => {
  const classes = useMessagesModalStyles();
  const searchResult = useSelector((state) => state.search.searchResult);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);


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
        senderId: 1,
        chatId: null,
        senderUsername: '',
        recipientUsername: ''
      };

      const chatDto = {
        chatId: null,
        messages: [messageDto]
      };


      axiosIns
          .post('/api/messages/chats/create', { messageDto, chatDto })
          .then((response) => {
            const createdChatDto = response.data;

          })
          .catch((error) => {
            console.error(error);
          });
    }
  };


  return (
      <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.header}>
          <IconButton onClick={onClose} color="secondary" aria-label="close">
            <CloseIcon color="secondary" />
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