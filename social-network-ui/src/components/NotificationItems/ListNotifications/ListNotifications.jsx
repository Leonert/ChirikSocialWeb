import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

import {
  addNotification,
  getNotifications,
  removeNotifications,
} from '../../../features/slices/userDatas/notificationsSlice';
import { SOCKET_URL } from '../../../util/constants';
import Spinner from '../../Spinner/Spinner';
import { ItemNotification } from '../ItemNotification/ItemNotification';
import { useStylesListNotification } from './LitsNotificationStyle';

export const ListNotifications = () => {
  const classes = useStylesListNotification();
  const { list, loading } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  console.log('list: ', list);

  useEffect(() => {
    dispatch(getNotifications());

    return () => {
      dispatch(removeNotifications());
    };
  }, []);

  const onSocketChange = (notification) => {
    dispatch(addNotification(notification));
  };

  return (
    <ul className={classes.list}>
      {list.length === 0 && loading ? (
        <Spinner />
      ) : (
        <>
          <SockJsClient url={SOCKET_URL} topics={['/topic/notifications']} onMessage={onSocketChange} debug={false} />
          {list.map((notification, index) => {
            return <ItemNotification key={index} notification={notification} />;
          })}
        </>
      )}
    </ul>
  );
};
