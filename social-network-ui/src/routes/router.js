import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Layout page</div>,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/main',
        element: <div>Main page</div>,
      },
    ],
  },
]);
