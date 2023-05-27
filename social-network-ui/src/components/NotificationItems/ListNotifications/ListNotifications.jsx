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

  useEffect(() => {
    dispatch(getNotifications());

    return () => {
      dispatch(removeNotifications());
    };
  }, []);

  return (
    <ul className={classes.list}>
      {list.length === 0 && loading ? (
        <Spinner />
      ) : (
        list.map((notification, index) => {
          return <ItemNotification key={index} notification={notification} />;
        })
      )}
    </ul>
  );
};
