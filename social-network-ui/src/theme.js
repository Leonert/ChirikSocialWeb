import {deepmerge} from "@mui/utils";
import {createTheme} from "@mui/material/styles";


const commonTheme = {
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Ubuntu',
      'Helvetica Neue',
      'sans-serif',
    ],
  },
  palette: {
    common: {
      black: 'rgb(15, 20, 25)',
      white: 'rgb(255, 255, 255)',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
        textTransform: 'none',
        height: 36,
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      sizeSmall: {
        height: 32,
        padding: '0px 16px',
      },
      sizeLarge: {
        height: 44,
        '& .MuiButton-label': {
          fontSize: 15,
          fontWeight: 700,
          lineHeight: '20px',
        },
      },
      label: {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: '16px',
      },
    },
    MuiFilledInput: {
      underline: {
        '&:after': {
          borderBottomWidth: '2px',
        },
        '&:before': {
          borderColor: '#000',
          borderBottomWidth: '2px',
        },
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 15,
      },
    },
    MuiDialogActions: {
      root: {
        marginBottom: 8,
      },
    },
    MuiDialogTitle: {
      root: {
        borderBottom: '1px solid rgb(204, 214, 221)',
        marginBottom: 10,
        padding: '10px 15px',
        '& h2': {
          display: 'flex',
          alignItems: 'center',
          fontSize: 20,
          fontWeight: 800,
          lineHeight: '24px',
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
        minWidth: 35,
        minHeight: 35,
        '& svg': {
          height: '1.25rem',
          width: '1.25rem',
        },
      },
      sizeSmall: {
        padding: 0,
        minWidth: 35,
        minHeight: 35,
        '& svg': {
          height: '1.172rem',
          width: '1.172rem',
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiListItemAvatar: {
      root: {
        minWidth: 0,
      },
    },
    MuiTypography: {
      h3: {
        fontSize: 23,
        fontWeight: 700,
        lineHeight: '28px',
      },
      h4: {
        marginBottom: 8,
        fontSize: 31,
        fontWeight: 800,
        lineHeight: '36px',
      },
      h5: {
        fontSize: 20,
        fontWeight: 800,
        lineHeight: '24px',
      },
      h6: {
        fontSize: 15,
        fontWeight: 800,
        lineHeight: '20px',
      },
      subtitle1: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: '20px',
      },
      subtitle2: {
        fontSize: 13,
        fontWeight: 400,
        lineHeight: '16px',
      },
      body1: {
        fontSize: 15,
        fontWeight: 400,
        lineHeight: '20px',
      },
      body2: {},
    },
  },
};
export const defaultTheme = createTheme(
  deepmerge(
    {
      palette: {
        background: {
          default: 'rgb(21, 32, 43)',
          paper: 'rgb(21, 32, 43)',
          lithe: 'rgb(133,123,123)',
          lightBlue: 'rgb(63, 81, 181)',
          lightDefault: 'rgb(19, 36, 51)',
        },
        secondary: {
          light: 'rgb(29, 155, 240, 0.1)',
          main: 'rgb(25, 39, 52)',
          dark: 'rgb(255, 255, 255, 0.03)',
        },
        text: {
          primary: 'rgb(255, 255, 255)',
          secondary: 'rgb(136, 153, 166)',
        },
        divider: 'rgb(56, 68, 77)',
        grey: {
          100: 'rgb(61, 84, 102)',
          200: 'rgb(37, 51, 65)',
          300: 'rgb(136, 153, 166)',
          400: 'rgb(29, 41, 54)',
          500: 'rgb(78, 92, 104)',
          600: 'rgb(25, 39, 52)',
          700: 'rgb(61, 84, 102)',
          800: 'rgba(91, 112, 131, 0.4)',
        },
      },
      overrides: {
        MuiPaper: {
          root: {
            borderRadius: 0,
            border: '1px solid rgb(56, 68, 77)',
          },
          outlined: {
            borderRadius: 0,
            border: '1px solid rgb(56, 68, 77)',
          },
          elevation1: {
            boxShadow: 'none',
          },
          elevation8: {
            boxShadow: 'none',
          },
        },
        MuiTypography: {
          h3: {
            color: 'rgb(255, 255, 255)',
          },
          h4: {
            color: 'rgb(255, 255, 255)',
          },
          h5: {
            color: 'rgb(255, 255, 255)',
          },
          h6: {
            color: 'rgb(255, 255, 255)',
          },
          subtitle1: {
            color: 'rgb(136, 153, 166)',
          },
          subtitle2: {
            color: 'rgb(136, 153, 166)',
          },
          body1: {
            color: 'rgb(255, 255, 255)',
          },
        },
        MuiButton: {
          contained: {

            color: 'rgb(255, 255, 255) !important',

          },
        },
        MuiBackdrop: {
          root: {
            backgroundColor: 'rgba(91, 112, 131, 0.4)',
          },
        },
      },
    },
    commonTheme
  )
);
