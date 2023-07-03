import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import PostFooterBtn from './PostFooterBtn';

test('should handle click events', () => {
  const handleClickReplay = jest.fn();
  const handleClickRetweet = jest.fn();
  const handleClickLike = jest.fn();
  const handleClickBookmark = jest.fn();

  const theme = createTheme();

  const { getByLabelText } = render(
    <ThemeProvider theme={theme}>
      <PostFooterBtn
        repeatCount={3}
        replay={2}
        retweet={3}
        like={5}
        bookmark={1}
        handleClickReplay={handleClickReplay}
        handleClickRetweet={handleClickRetweet}
        handleClickLike={handleClickLike}
        handleClickBookmark={handleClickBookmark}
      />
    </ThemeProvider>
  );

  const replayButton = getByLabelText('Reply');
  const retweetButton = getByLabelText('Retweet');
  const likeButton = getByLabelText('add to Like');
  const bookmarkButton = getByLabelText('add to Bookmarks');

  fireEvent.click(replayButton);
  fireEvent.click(retweetButton);
  fireEvent.click(likeButton);
  fireEvent.click(bookmarkButton);

  expect(handleClickReplay).toHaveBeenCalledTimes(1);
  expect(handleClickRetweet).toHaveBeenCalledTimes(1);
  expect(handleClickLike).toHaveBeenCalledTimes(1);
  expect(handleClickBookmark).toHaveBeenCalledTimes(1);
});
