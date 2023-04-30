import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { replayMessage } from '../../features/slices/homeSlice';

function MyForm() {
  // const [text, setText] = useState('');
  const [remainingChars, setRemainingChars] = useState(280);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.home.replayMessage);

  const handleTextChange = (event) => {
    const newCount = 280 - event.target.value.length;
    if (newCount >= 0) {
      setRemainingChars(newCount);
      dispatch(replayMessage(event.target.value));
    }
  };

  return (
    <div>
      <TextField
        label={`Enter replay left: ${remainingChars} symbols`}
        value={message}
        onChange={handleTextChange}
        multiline
        maxRows={4}
        fullWidth
      />
    </div>
  );
}

export default MyForm;
