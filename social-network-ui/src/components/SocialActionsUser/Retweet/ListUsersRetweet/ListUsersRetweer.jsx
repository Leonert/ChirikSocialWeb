import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../../Spinner/Spinner';
import { ItemUser } from '../../ItemUser/ItemUser';

export const ListUsersRetweet = () => {
  const dispatch = useDispatch();
  // const { usersRetweet } = useSelector((state) => state.user);
  // const { loading } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(getUsersLike());
  // }, []);
  return (
    <ul>
      {/* {loading && <Spinner />} */}
      {/* {usersRetweet &&
        usersLike.map((user) => {
          return <ItemUser key={user.id} user={user} />;
        })} */}

      <ItemUser />
      <ItemUser />
      <ItemUser />
      <ItemUser />
    </ul>
  );
};
