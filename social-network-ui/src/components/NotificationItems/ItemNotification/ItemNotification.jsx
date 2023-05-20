import { Box, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

import { useStylesItemNotification } from './ItemNotifacionsStyles';

export const ItemNotification = () => {
  const classes = useStylesItemNotification();

  return (
    <li className={classes.item}>
      {/* <Link to={`/profile/${id}`}> */}
      <Box className={classes.avatar}>Avatar</Box>
      <Box className={classes.username}>username</Box>
      <Box className={classes.content}>some content text</Box>
      {/* </Link> */}
    </li>
  );
};
