import { Typography } from '@mui/material';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUsersRetweet } from '../../../../features/slices/postDatas/retweetsSlice';
import Spinner from '../../../Spinner/Spinner';
import { ItemUser } from '../../ItemUser/ItemUser';

export const ListUsersRetweer = forwardRef(function ListUsersRetweer(props, ref) {
  const dispatch = useDispatch();
  const { loading, listUsers, isTotalUsers } = useSelector((state) => state.retweets);
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();

  const handleScroll = useCallback(
    (e) => {
      if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
        if (!isTotalUsers) {
          if (loading) return;
          setCurrentPage((prevState) => prevState + 1);
          dispatch(getUsersRetweet({ id, currentPage: currentPage + 1 }));

          e.target.removeEventListener('scroll', handleScroll);
        }
      }
    },
    [dispatch, loading, isTotalUsers, currentPage]
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
    if (listUsers.length === 0) {
      dispatch(getUsersRetweet({ id, currentPage }));
    }
  }, []);

  return (
    <ul>
      {loading && <Spinner p="50px 0" />}
      {listUsers.length === 0 && !loading ? (
        <Typography sx={{ textAlign: 'center' }} variant="h5">
          The retweets are not there.
        </Typography>
      ) : (
        listUsers.map((user) => {
          return <ItemUser key={user.id} user={user} />;
        })
      )}
    </ul>
  );
});
