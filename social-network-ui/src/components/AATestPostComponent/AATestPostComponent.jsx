import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { handleCustomModal } from '../../features/slices/customModalSlice';
import { handleOpenLikeModal } from '../../features/slices/postDatas/likesSlice';
import { handleOpenRetweetModal } from '../../features/slices/postDatas/retweetsSlice';

export const AATestPostComponent = () => {
  const dispatch = useDispatch();
  const handleClickOpenLikesModal = () => {
    dispatch(handleCustomModal(true));
    dispatch(handleOpenLikeModal(true));
  };
  const handleClickOpenRetweetModal = () => {
    dispatch(handleCustomModal(true));
    dispatch(handleOpenRetweetModal(true));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpenLikesModal}>
        Open likes modal
      </Button>
      <Button variant="outlined" onClick={handleClickOpenRetweetModal}>
        Open retweets modal
      </Button>
    </div>
  );
};
