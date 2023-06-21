import { Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axiosIns from '../../axiosInstance';
import { addOnePost, addReply, clothReplayModal, replayMessage } from '../../features/slices/homeSlice';
import { EmojiIcon, MediaIcon } from '../../icon';
import ActionIconButton from '../ActionIconButton/ActionIconButton';
import TextInput from './TextInput';

function FormModal({ buttonName }) {
  const dispatch = useDispatch();

  const text = useSelector((state) => state.home.message);
  const id = useSelector((state) => state.home.postId);
  const post = useSelector((state) => state.home.post);
  const user = useSelector((state) => state.auth.user);
  const fileInputRef = useRef(null);
  const visiblePoll = false;
  const MAX_LENGTH = 280;
  const handleClickImage = () => {
    fileInputRef.current.click();
  };
  const handleTextChange = (event) => {
    const newCount = 280 - event.target.value.length;
    if (newCount >= 0) {
      dispatch(replayMessage(event.target.value));
    }
  };

  const targetPost = post.find((item) => +item.id === +id);

  const sendRequest = async () => {
    await axiosIns.post('/api/posts', { text, originalPost: targetPost.id }).then((response) => {
      dispatch(addOnePost(response.data));
      dispatch(addReply(targetPost.id));
      dispatch(clothReplayModal());
      dispatch(replayMessage(''));
    });
  };

  return (
    <div>
      {targetPost && (
        <>
          <div style={{ display: 'flex', width: '100%', backgroundColor: (theme) => theme.palette.background.default }}>
            <Avatar aria-label="recipe" alt={targetPost.author.name} src={targetPost.author.profileImage}></Avatar>
            <Typography
              sx={{ paddingTop: '8px', marginLeft: '15px !important', color: (theme) => theme.palette.text.secondary }}
            >
              @{targetPost.author.name}
            </Typography>
          </div>
          <Typography sx={{ margin: '10px 55px !important', color: (theme) => theme.palette.text.secondary }}>
            Send replay @{targetPost.author.name}
          </Typography>
          <div style={{ display: 'flex', width: '100%', backgroundColor: (theme) => theme.palette.background.default }}>
            <Avatar />
            <Typography
              sx={{ paddingTop: '8px', marginLeft: '15px !important', color: (theme) => theme.palette.text.secondary }}
            >
              @{user.name}
            </Typography>
          </div>

          <TextInput handleTextChange={handleTextChange} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                position: 'relative',
                paddingTop: 5,
                paddingBottom: 5,
                left: -13,
                justifyContent: 'space-between',
                maxWidth: 450,
                marginTop: 10,
                paddingLeft: 70,
              }}
            >
              <div>
                <ActionIconButton actionText={'Media'} icon={MediaIcon} onClick={handleClickImage} size={'medium'} />
                <ActionIconButton id={'onClickAddEmoji'} actionText={'Emoji'} icon={EmojiIcon} size={'medium'} />
                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleTextChange} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={sendRequest}
                disabled={visiblePoll ? !text || text.length < MAX_LENGTH - 1 : !text || text.length >= MAX_LENGTH + 2}
                color="primary"
                variant="contained"
              >
                {buttonName}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FormModal;
