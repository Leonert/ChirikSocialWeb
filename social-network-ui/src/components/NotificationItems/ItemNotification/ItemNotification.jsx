import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';

import { getPost } from '../../../api/getPostById';
import { createNotifications } from '../../../util/notificationsMessage/notificationsMessage';

const Item = styled('li')(({ theme }) => ({
  padding: '20px 20px 20px 40px',
  border: '1px solid #eceff1',

  borderCollapse: 'collapse',
  '&:hover': {
    backgroundColor: '#eceff1',
  },
}));
const Link = styled(RouteLink)(({ theme }) => ({
  display: 'inline-block',
}));
const Avatar = styled(Box)(({ theme }) => ({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '4px',
}));
const AvatarImg = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
}));
const Username = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  fontSize: '16px',
  color: 'black',
  marginBottom: '14px',
}));
const Content = styled(Box)(({ theme }) => ({
  fontSize: '12px',
  color: 'black',
}));
const Post = styled('span')(({ theme }) => ({
  fontWeight: 600,
}));

export const ItemNotification = ({ notification }) => {
  const [notificationElem, setNotificationsElem] = useState(null);
  const { loading } = useSelector((state) => state.notifications);
  const [post, setPost] = useState(null);

  function generateRandomRGBA() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = Math.random();

    const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    return rgbaColor;
  }

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
        <Item>
          <Box>
            <Link to={`/${notification?.initiator?.username}`}>
              <Avatar>
                {notificationElem.profileImage ? (
                  <AvatarImg src={notificationElem.profileImage} alt={notificationElem.username} />
                ) : (
                  <div
                    style={{
                      backgroundColor: `${generateRandomRGBA()}`,
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      fontSize: '20px',
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {notificationElem.name ? notificationElem.name.slice(0, 1) : ''}
                  </div>
                )}
              </Avatar>
              {notificationElem.username && <Username>@{notificationElem.username}</Username>}
            </Link>
            <Content>
              {post !== null ? (
                <Link to={`/${post?.author.username}/${post?.author.id}`}>
                  {notificationElem.message} <Post>{post.text.slice(0, 50)}</Post>
                </Link>
              ) : (
                `${notificationElem.message}`
              )}
            </Content>
          </Box>
        </Item>
      )}
    </>
  );
};
