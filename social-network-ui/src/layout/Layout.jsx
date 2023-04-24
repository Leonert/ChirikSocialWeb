import { Outlet } from 'react-router-dom';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';
import { Login } from '../components/Login/Login';

export const Layout = () => {
  return (
    <div>
      <Modal children={<Login />} open={true} />
      <Outlet />
    </div>
  );
};
