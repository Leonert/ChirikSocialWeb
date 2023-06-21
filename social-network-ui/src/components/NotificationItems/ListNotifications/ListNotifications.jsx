import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNotifications, removeNotifications } from '../../../features/slices/userDatas/notificationsSlice';
import Spinner from '../../Spinner/Spinner';
import { ItemNotification } from '../ItemNotification/ItemNotification';

export const ListNotifications = () => {
  const { list, loading } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());

    return () => {
      dispatch(removeNotifications());
    };
  }, []);

  return (
    <ul>
      {list.length === 0 && loading ? (
        <Spinner p="50px 0" />
      ) : (
        list.map((notification, index) => {
          return <ItemNotification key={index} notification={notification} />;
        })
      )}
    </ul>
  );
};
