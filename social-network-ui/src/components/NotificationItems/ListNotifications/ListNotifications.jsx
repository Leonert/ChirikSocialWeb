import { List } from '@mui/material';
import { useSelector } from 'react-redux';

import Spinner from '../../Spinner/Spinner';
import { ItemNotification } from '../ItemNotification/ItemNotification';
import { useStylesListNotification } from './LitsNotificationStyle';

export const ListNotifications = () => {
  const classes = useStylesListNotification();
  // const { notifications } = useSelector((state) => state.auth.user);
  // const { loading } = useSelector((state) => state.auth);

  return (
    <ul className={classes.list}>
      {/* {loading ? (
        <Spinner />
      ) : (
        notifications.map((notification) => {
          return <ItemNotification key={notification.id} notification={notification} />;
        })
      )} */}
      <ItemNotification />
      <ItemNotification />
      <ItemNotification />
      <ItemNotification />
    </ul>
  );
};
