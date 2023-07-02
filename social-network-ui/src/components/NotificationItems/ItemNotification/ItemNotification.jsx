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
  const [post, setPost] = useState(null);

  useEffect(() => {
    setNotificationsElem(createNotifications(notification));
  }, [loading]);

  useEffect(() => {
    if (notification.post !== null) {
      const fetchData = async (id) => {
        const post = await getPost(id);
        setPost(post);
      };

      fetchData(notification.post.id);
    }
  }, [notificationElem]);

  return (
    <>
      {notificationElem && (
        <li className={classes.item}>
          <Box>
            {notification?.initiator !== null ? (
              <Link className={classes.link} to={`/${notification?.initiator?.username}`}>
                <Box className={classes.avatar}>
                  {notificationElem.profileImage ? (
                    <img
                      className={classes.avatarImg}
                      src={notificationElem.profileImage}
                      alt={notificationElem.username}
                    />
                  ) : (
                    <div style={{ backgroundColor: `#94a3b8` }} className={classes.avatarText}>
                      {notificationElem.name ? notificationElem.name.slice(0, 1) : ''}
                    </div>
                  )}
                </Box>
                {notificationElem.username && <Box className={classes.username}>@{notificationElem.username}</Box>}
              </Link>
            ) : null}

            <Box className={classes.content}>
              {post !== null ? (
                <Link to={`/${post?.author.username}/${post?.author.id}`}>
                  {notificationElem.message}{' '}
                  <span className={classes.post}>
                    {post.text?.slice(0, 50) ?? post.originalPost.text?.slice(0, 50) ?? ''}
                  </span>
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
