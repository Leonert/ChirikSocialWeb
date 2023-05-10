import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../../Spinner/Spinner';
import { ItemUser } from '../../ItemUser/ItemUser';

export const ListUsersLike = () => {
  const dispatch = useDispatch();
  // const { usersLike } = useSelector((state) => state.user);
  // const { loading } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(getUsersLike());
  // }, []);
  return (
    <ul>
      {/* {loading && <Spinner />} */}
      {/* {usersLike &&
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
