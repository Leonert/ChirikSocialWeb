import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersRetweet } from '../../../../features/slices/postDatas/retweetsSlice';
import Spinner from '../../../Spinner/Spinner';
import { ItemUser } from '../../ItemUser/ItemUser';

export const ListUsersRetweer = forwardRef(function ListUsersRetweer(props, ref) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.retweets);
  const { listUsers } = useSelector((state) => state.retweets);
  const [currentPage, setCurrentPage] = useState(0);
  const totalUsers = 10;

  const handleScroll = useCallback(
    (e) => {
      if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
        if (listUsers.length < totalUsers) {
          if (loading) return;
          setCurrentPage((prevState) => prevState + 1);
          dispatch(getUsersRetweet({ id: 1, currentPage: currentPage + 1 }));

          e.target.removeEventListener('scroll', handleScroll);
        }
      }
    },
    [dispatch, loading, totalUsers, currentPage]
  );

  useEffect(() => {
    const contentElementWrap = ref.current?.childNodes[2];
    const contentElement = contentElementWrap.childNodes[0];
    const element = contentElement.childNodes[1];

    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref, listUsers]);

  useEffect(() => {
    if (listUsers === null) {
      dispatch(getUsersRetweet({ id: 1, currentPage }));
    }
  }, []);

  return (
    <ul>
      {' '}
      {loading && <Spinner />}{' '}
      {listUsers &&
        listUsers.map((user) => {
          return <ItemUser key={user.id} user={user} />;
        })}
    </ul>
  );
});
