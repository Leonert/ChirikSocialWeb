import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout';

import SideMenu from "../components/SideMenu/SideMenu";
import {MuiThemeProvider} from "@material-ui/core";
import { defaultTheme} from "../theme";
import CssBaseline from "@material-ui/core/CssBaseline";



export const theme= (defaultTheme);
export const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/main',
        element:
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <SideMenu />
            </MuiThemeProvider>,
      },
    ],
  },
]);
