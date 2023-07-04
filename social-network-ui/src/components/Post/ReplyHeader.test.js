import { toBeInTheDocument } from '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ReplyHeader from './ReplyHeader';

describe('ReplyHeader component', () => {
  test('renders the correct retweet count', () => {
    const repeatCount = 10;
    render(<ReplyHeader repeat={repeatCount} />);
    const retweetText = screen.getByText(`${repeatCount} Retweeted`);
    expect(retweetText).toBeInTheDocument();
  });
});
