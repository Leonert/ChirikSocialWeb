import { Outlet } from 'react-router-dom';

import { BottomLine } from '../../components/BottomLine/BottomLine';

const Layout = () => {
  return (
    <div>
      <div className="container">
        <Outlet />
      </div>
      <BottomLine />
    </div>
  );
};

export default Layout;
