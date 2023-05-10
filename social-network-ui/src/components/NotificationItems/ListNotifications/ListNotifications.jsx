import { List } from '@mui/material';

import { ItemNotification } from '../ItemNotification/ItemNotification';

export const ListNotifications = () => {
  return (
    <List>
      <ItemNotification />
      <ItemNotification />
      <ItemNotification />
      <ItemNotification />
    </List>
  );
};
