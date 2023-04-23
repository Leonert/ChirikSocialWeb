import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import Home from "../components/pages/Home/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: "/main",
        element: <Home />,
      },
    ],
  },
]);
