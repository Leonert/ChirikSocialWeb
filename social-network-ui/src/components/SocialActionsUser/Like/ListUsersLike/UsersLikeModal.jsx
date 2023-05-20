import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { handleCustomModal } from '../../../../features/slices/customModalSlice';
import { CustomModalWindow } from '../../../CustomModalWindow/CustomModalWindow';
import { ListUsersLike } from './ListUsersLike';

export const UsersLikeModal = forwardRef(function UsersLikeModal(props, ref) {
  const { open } = useSelector((state) => state.customModal);

  return (
    <>
      <CustomModalWindow handleCustomModal={handleCustomModal} open={open} title="Liked by">
        <ListUsersLike />
      </CustomModalWindow>
    </>
  );
});
