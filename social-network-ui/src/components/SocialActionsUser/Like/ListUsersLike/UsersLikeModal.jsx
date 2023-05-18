import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleCustomModal } from '../../../../features/slices/customModalSlice';
import { getUsersLike } from '../../../../features/slices/postDatas/likesSlice';
import { CustomModalWindow } from '../../../CustomModalWindow/CustomModalWindow';
import { ListUsersLike } from './ListUsersLike';

export const UsersLikeModal = forwardRef(function UsersLikeModal(props, ref) {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.customModal);
  // const { listUsers } = useSelector((state) => state.likes);
  // const [currentPage, setCurrentPage] = useState(0);
  // const totalUsers = 10;

  return (
    <>
      <CustomModalWindow handleCustomModal={handleCustomModal} open={open} title="Liked by">
        <ListUsersLike />
      </CustomModalWindow>
    </>
  );
});
