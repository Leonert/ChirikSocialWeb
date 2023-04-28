import { createBrowserRouter } from 'react-router-dom';

import Home from '../components/pages/Home/Home';
import { Layout } from '../layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
