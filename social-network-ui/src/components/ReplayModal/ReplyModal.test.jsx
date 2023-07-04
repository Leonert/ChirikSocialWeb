import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CloseButton from '../SideMenu/AddTweetModal/AddTweetForm/CloseButton/CloseButton';

describe('CloseButton', () => {
  it('should call onClose when clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(<CloseButton onClose={onCloseMock} />);

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
