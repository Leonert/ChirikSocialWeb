import { Outlet } from 'react-router-dom';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';
import { Login } from '../components/Login/Login';
import { BottomLine } from '../components/BottomLine/BottomLine';

export const Layout = () => {
  return (
    <div>
      <div className="container">
        <Modal children={<Login />} open={true} />
        <Outlet />
      </div>
      <BottomLine />
    </div>
  );
};
