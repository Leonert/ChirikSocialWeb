import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getPost } from '../../../api/getPostById';
import { createNotifications } from '../../../util/notificationsMessage/notificationsMessage';
import { useStylesItemNotification } from './ItemNotifacionsStyles';

export const ItemNotification = ({ notification }) => {
  const classes = useStylesItemNotification();
  const [notificationElem, setNotificationsElem] = useState(null);
  const { loading } = useSelector((state) => state.notifications);
  const [textPost, setTextPost] = useState('');

  useEffect(() => {
    setNotificationsElem(createNotifications(notification));
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      if (notification.post !== null) {
        const post = await getPost(notification.post.id);
        setTextPost(post);
      }
    };

    fetchData();
  }, [notificationElem]);

  return (
    <>
      {notificationElem && (
        <li className={classes.item}>
          <Box>
            {notificationElem.profileImage && (
              <Box className={classes.avatar}>
                <img src={notificationElem.profileImage} alt={notificationElem.username} />
              </Box>
            )}
            {notificationElem.username && <Box className={classes.username}>@{notificationElem.username}</Box>}
            <Box className={classes.content}>
              {textPost ? (
                <p>
                  {notificationElem.message} <span className={classes.post}>{textPost.slice(0, 50)}</span>
                </p>
              ) : (
                `${notificationElem.message}`
              )}
            </Box>
          </Box>
        </li>
      )}
    </>
  );
};
