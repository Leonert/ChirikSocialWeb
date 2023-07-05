import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNotifications, removeNotifications } from '../../../features/slices/userDatas/notificationsSlice';
import Spinner from '../../Spinner/Spinner';
import { ItemNotification } from '../ItemNotification/ItemNotification';
import { useStylesListNotification } from './LitsNotificationStyle';

export const ListNotifications = () => {
  const classes = useStylesListNotification();
  const { list, loading } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  function convertToMilliseconds(timestamp) {
    return Date.parse(timestamp);
  }

  useEffect(() => {
    dispatch(getNotifications());

    return () => {
      dispatch(removeNotifications());
    };
  }, []);

  return (
    <ul className={classes.list}>
      {list.length === 0 && loading ? (
        <Spinner p="50px 0" />
      ) : (
        list.map((notification, index) => {
          return <ItemNotification key={convertToMilliseconds(notification.timestamp)} notification={notification} />;
        })
      )}
    </ul>
  );
};
