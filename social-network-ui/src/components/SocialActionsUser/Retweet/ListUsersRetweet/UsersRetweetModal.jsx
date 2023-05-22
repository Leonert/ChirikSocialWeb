import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { handleCustomModal } from '../../../../features/slices/customModalSlice';
import { CustomModalWindow } from '../../../CustomModalWindow/CustomModalWindow';
import { ListUsersRetweer } from './ListUsersRetweer';

export const UsersRetweetModal = forwardRef(function UsersLikeModal(props, ref) {
  const { open } = useSelector((state) => state.customModal);

  return (
    <>
      <CustomModalWindow handleCustomModal={handleCustomModal} open={open} title="Retweet by">
        <ListUsersRetweer />
      </CustomModalWindow>
    </>
  );
});
