import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/main',
        element: <div>Main page</div>,
      },
    ],
  },
]);
