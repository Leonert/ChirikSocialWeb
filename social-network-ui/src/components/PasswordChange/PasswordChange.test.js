import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PasswordChange from './PasswordChange';
import { changePassword, changePasswordModal } from '../../features/slices/settingSlice';

const mockStore = configureStore([thunk]);

describe('PasswordChange component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      setting: {
        status: true,
      },
    });
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <PasswordChange />
      </Provider>
    );
  });

 

  test('calls dispatch with changePasswordModal action on close button click', () => {
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(store.dispatch).toHaveBeenCalledWith(changePasswordModal(false));
  });
});
