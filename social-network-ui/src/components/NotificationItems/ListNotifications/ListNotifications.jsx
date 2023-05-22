import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNotifications } from '../../../features/slices/userDatas/notificationsSlice';
import Spinner from '../../Spinner/Spinner';
import { ItemNotification } from '../ItemNotification/ItemNotification';
import { useStylesListNotification } from './LitsNotificationStyle';

export const ListNotifications = () => {
  const classes = useStylesListNotification();
  const { list } = useSelector((state) => state.notifications);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <ul className={classes.list}>
      {loading && <Spinner />}

      {list.length > 0 &&
        list.map((notification, index) => {
          return <ItemNotification key={index} notification={notification} />;
        })}
    </ul>
  );
};
