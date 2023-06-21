import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { SearchIcon } from '../../../icon';
import { MessagesModalInput } from './MessagesModalInput/MessagesModalInput';
import MessagesModalUser from './MessagesModalUser/MessagesModalUser';

const Header = styled(DialogTitle)(({ theme }) => ({
  margin: 0,
  border: 0,
  '& svg': {
    fontSize: 26,
  },
}));

const MessagesModal = ({ visible, onClose }) => {
  const users = [
    {
      avatar: { src: 'fff.jpeg' },
      fullName: 'John Smith',
      username: 'john_smith',
      id: 1,
    },
  ];

  const [selectedIndex] = useState();

  const [text, setText] = useState('');

  const handleClickSearch = (event) => {
    setText(event.target.value);
  };
  const onSearch = (text) => {
    if (text) {
      setText(text);
    } else {
      setText('');
    }
  };
  const handleListItemClick = () => {};

  return (
    <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <Header id="form-dialog-title">
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon color="secondary" />
        </IconButton>
        <span style={{ marginLeft: 15 }}>New message</span>
        <Button
          sx={{ marginLeft: 'auto', height: 30 }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={selectedIndex === undefined}
        >
          Next
        </Button>
      </Header>
      <DialogContent sx={{ height: 550, width: 598, padding: 0 }}>
        <form onSubmit={handleClickSearch}>
          <MessagesModalInput
            fullWidth
            placeholder="Explore people"
            onChange={(event) => onSearch(event.target.value)}
            variant="outlined"
            value={text}
            InputProps={{
              startAdornment: <InputAdornment position="start">{SearchIcon}</InputAdornment>,
            }}
          />
        </form>
        <div style={{ height: 1, backgroundColor: 'rgb(207, 217, 222)' }} />
        <List component="nav" aria-label="main mailbox folders">
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              selected={selectedIndex === user.id}
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
