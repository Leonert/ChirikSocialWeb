import { SearchIcon } from '../../icon';
import { MessagesModalInput } from './MessagesModalInput/MessagesModalInput';
import MessagesModalUser from './MessagesModalUser/MessagesModalUser';
import {useDispatch, useSelector} from "react-redux";
import axiosIns from "../../axiosInstance";
import {addResult, removeResult} from "../../features/slices/searchSlice";
import React, {useEffect, useState} from "react";
import {InputAdornment, List, ListItem} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import CloseButton from "../AddTweetModal/AddTweetForm/CloseButton/CloseButton";
import {
  addChat
} from "../../features/slices/massagesSlise";




const MessagesModal = ({ visible, onClose }) => {
  const searchResult = useSelector((state) => state.search.searchResult);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const authorId = useSelector((state) => state.messages.authorId);
  const [chatUsers, setChatUsers] = useState([]);
  const [createdChatId, setCreatedChatId] = useState(null);
  const [, setChat] = useState(null);
  const username = useSelector((state) => (state.auth.user ? state.auth.user.username : null));
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
      if (chatUsers === 0){
        setChatUsers(chatUsers.push(selectedUser))
      }else {
        setChatUsers((prevChatUsers)=>[...prevChatUsers,selectedUser])
      }



      const messageDto = {
        messageId: null,
        isRead: false,
        message: '',
        timestamp: null,
        recipientId: selectedUser.id,
        senderId: authorId,
        chatId: null,
        senderUsername: username,
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

            setCreatedChatId(createdChatDto.chatId);

            onClose(createdChatDto);
          })
          .catch((error) => {
            alert('An error occurred while creating chat. Please try again later.'+ error);
          });

    }
  };

  useEffect(() => {
    if (createdChatId) {
      axiosIns.get(`/api/messages/chats/${createdChatId}`).then((response) => {
        const chatData = response.data;
        setChat(chatData);
      });
    }
  }, [createdChatId]);


  return (
      <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title"
        sx={{
          margin: 0,
          border: 0,
          display: "flex",
          justifyContent:"space-between",

          "& svg": {
            fontSize: 26,
          },
        }}
        >
          <CloseButton onClose={onClose} color="#fff" />
          <span style={{
            marginLeft: 80,
          }}>New message</span>
          <Button
              sx={{
                marginLeft: "auto",
                height: 30,
                backgroundColor: 'rgb(63, 81, 181)',

              }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleCreateChat}
              disabled={!selectedUser}
          >
            Next
          </Button>
        </DialogTitle>

        <DialogContent sx={{
          height: 550,
          width: 598,
          padding: 0,
        }}>
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
          <div style={{
            height: 1,
            backgroundColor: "rgb(207, 217, 222)",
          }}/>
          <List component="nav" aria-label="main mailbox folders">
            {searchResult.map((user) => (
                <ListItem
                    key={user.id}
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