import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPost } from '../../../api/getPostById';
import { createNotifications } from '../../../util/notificationsMessage/notificationsMessage';
import { useStylesItemNotification } from './ItemNotifacionsStyles';

export const ItemNotification = ({ notification }) => {
  const classes = useStylesItemNotification();
  const [notificationElem, setNotificationsElem] = useState(null);
  const { loading } = useSelector((state) => state.notifications);
  const [textPost, setTextPost] = useState('');
  const { user } = useSelector((state) => state.auth);

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
            <Link to={`/${notification?.initiator?.username}`}>
              {notificationElem.profileImage && (
                <Box className={classes.avatar}>
                  <img src={notificationElem.profileImage} alt={notificationElem.username} />
                </Box>
              )}
              {notificationElem.username && <Box className={classes.username}>@{notificationElem.username}</Box>}
            </Link>
            <Box className={classes.content}>
              {textPost ? (
                <Link to={`/${user.username}/${notification?.post.id}`}>
                  {notificationElem.message} <span className={classes.post}>{textPost.slice(0, 50)}</span>
                </Link>
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
