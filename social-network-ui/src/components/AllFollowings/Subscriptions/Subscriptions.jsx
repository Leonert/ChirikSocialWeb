import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import { Followers } from '../../components/AllFollowings/Followers/Followers';
// import { Following } from '../../components/AllFollowings/Following/Following';
import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import { ArrowBack } from '../../ArrowBack/ArrowBack';
import { useStyles } from './SubscriptionsStyles';

export const Subscriptions = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { followers } = useSelector((state) => state.subscriptions);
  const { following } = useSelector((state) => state.subscriptions);

  const hadeleFollowersCLick = () => {
    dispatch(handleFollowers(true));
    dispatch(handleFollowing(false));
  };
  const hadeleFollowingCLick = () => {
    dispatch(handleFollowers(false));
    dispatch(handleFollowing(true));
  };

  return (
    <Box className={classes.subscriptionsWrap}>
      <Box className={classes.header}>
        <Box className={classes.user}>
          <Box className={classes.arrow}>
            <ArrowBack />
          </Box>
          <Box>
            <Typography className={classes.name} variant="h6">
              Name
            </Typography>

            <Typography className={classes.username} variant="span">
              @username
            </Typography>
          </Box>
        </Box>
        <Box className={classes.followersWrap}>
          <Link
            to="/username/followers"
            // // to={`/${username}/followers`}
          >
            <Box onClick={hadeleFollowersCLick} className={classes.follower}>
              <Typography
                style={followers ? { borderBottom: '5px solid rgb(48, 63, 159)' } : {}}
                variant="span"
                className={classes.followerItem}
              >
                Followers
              </Typography>
            </Box>
          </Link>
          <Link
            to="/username/following"
            // to={`"/${username}/following"`}
          >
            <Box onClick={hadeleFollowingCLick} className={classes.follower}>
              <Typography
                style={following ? { borderBottom: '5px solid rgb(48, 63, 159)' } : {}}
                variant="span"
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
