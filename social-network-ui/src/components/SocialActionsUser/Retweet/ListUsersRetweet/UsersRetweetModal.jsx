import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleCustomModal } from '../../../../features/slices/customModalSlice';
import { CustomModalWindow } from '../../../CustomModalWindow/CustomModalWindow';
import { ListUsersRetweer } from './ListUsersRetweer';

export const UsersRetweetModal = forwardRef(function UsersLikeModal(props, ref) {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.customModal);
  // const { listUsers } = useSelector((state) => state.likes);
  // const [currentPage, setCurrentPage] = useState(0);
  // const totalUsers = 10;

  return (
    <>
      <CustomModalWindow handleCustomModal={handleCustomModal} open={open} title="Retweet by">
        <ListUsersRetweer />
      </CustomModalWindow>
    </>
  );
});
