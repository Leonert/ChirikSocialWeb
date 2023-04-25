import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { BottomLine } from '../components/BottomLine/BottomLine';
import { Login } from '../components/Login/Login';
import Modal from '../components/UI/Modal';

export const Layout = () => {
  const { login } = useSelector((state) => state.authModal);
  const { user } = useSelector((state) => state.login);

  return (
    <div>
      <div className="container">
        <Modal>{login ? <Login /> : '<Sign up/>'}</Modal>
        <Outlet />
      </div>
      {!user && <BottomLine />}
    </div>
  );
};
