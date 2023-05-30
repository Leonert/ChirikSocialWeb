import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getUser } from '../../../api/getUserByUsername';
import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import { ArrowBack } from '../../ArrowBack/ArrowBack';
import { useStyles } from './SubscriptionsStyles';

export const Subscriptions = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { followers } = useSelector((state) => state.subscriptions);
  const { following } = useSelector((state) => state.subscriptions);
  // const { user } = useSelector((state) => state.auth);
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const hadeleFollowersCLick = () => {
    dispatch(handleFollowers(true));
    dispatch(handleFollowing(false));
  };
  const hadeleFollowingCLick = () => {
    dispatch(handleFollowers(false));
    dispatch(handleFollowing(true));
  };

  useEffect(() => {
    // if (notification.post !== null) {
    const fetchData = async (usernameData) => {
      const userInfo = await getUser(usernameData);
      setUser(userInfo);
    };

    fetchData(username);
    // }
  }, []);

  return (
    <Box className={classes.subscriptionsWrap}>
      <Box className={classes.header}>
        <Box className={classes.user}>
          <Box className={classes.arrow}>
            <ArrowBack />
          </Box>
          <Box>
            <Typography className={classes.name} variant="h6">
              {user && user?.name}
            </Typography>

            <Typography className={classes.username}>@{username}</Typography>
          </Box>
        </Box>
        <Box className={classes.followersWrap}>
          <Link to={`/${username}/followers`}>
            <Box onClick={hadeleFollowersCLick} className={classes.follower}>
              <Typography
                style={followers ? { borderBottom: '5px solid rgb(48, 63, 159)' } : {}}
                className={classes.followerItem}
              >
                Followers
              </Typography>
            </Box>
          </Link>
          <Link to={`/${username}/following`}>
            <Box onClick={hadeleFollowingCLick} className={classes.follower}>
              <Typography
                style={following ? { borderBottom: '5px solid rgb(48, 63, 159)' } : {}}
                className={classes.followerItem}
              >
                Following
              </Typography>
            </Box>
          </Link>
        </Box>
      </Box>
      <Box>{props.children}</Box>
    </Box>
  );
};
