import { ThemeProvider, createTheme } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleLogOutModal } from '../../features/slices/authModalSlice';
import LogOut from './LogOut';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('LogOut component', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({
      user: { id: 1, name: 'John', username: 'john123', profileImage: 'avatar.png', action: 'Action' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls dispatch with handleLogOutModal action on LogOutButton click', () => {
    const theme = createTheme();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <LogOut />
      </ThemeProvider>
    );
    const logOutButton = getByTestId('log-out-button');

    fireEvent.click(logOutButton);

    expect(dispatchMock).toHaveBeenCalledWith(handleLogOutModal(true));
  });
});
