// @ts-nocheck
import { createTheme } from "@material-ui/core/styles";
import { deepmerge } from "@mui/utils";
export const defaultTheme = createTheme(deepmerge({
    palette: {
        background: {
            default: "rgb(30,32,40)",
            paper: "rgb(184,204,215)"
        },
        secondary: {
            light: "rgba(72,54,54,0.33)",
            main: "rgb(108,178,197)",
            dark: "rgb(255,255,255)"
        },
        text: {
            primary: "rgb(173,186,199)",
            secondary: "rgb(208,198,198)"
        },
        divider: "rgb(211,211,211)",
        grey: {
            "100": "#C4C4C4",
            "200": "rgb(239, 243, 244)",
            "300": "rgb(136, 153, 166)",
            "400": "rgb(239, 243, 244)",
            "500": "rgba(116,138,157,0.5)",
            "600": "rgb(247, 249, 249)",
            "700": "rgb(207, 217, 222)",
            "800": "rgba(229,212,212,0.4)"
        }
    },
    overrides: {
        MuiPaper: {
            root: {
                borderRadius: 0,
                border: "1px solid rgb(239, 243, 244)"
            },
            outlined: {
                borderRadius: 0,
                border: "1px solid rgb(239, 243, 244)"
            },
            elevation1: {
                boxShadow: "none"
            },
            elevation8: {
                boxShadow: "none"
            }
        },
        MuiTypography: {
            h3: {
                color: "rgb(15, 20, 25)"
            },
            h4: {
                color: "rgb(15, 20, 25)"
            },
            h5: {
                color: "rgb(15, 20, 25)"
            },
            h6: {
                color: "rgb(15, 20, 25)"
            },
            subtitle1: {
                color: "rgb(83, 100, 113)"
            },
            subtitle2: {
                color: "rgb(83, 100, 113)"
            },
            body1: {
                color: "rgb(15, 20, 25)"
            }
        },
        MuiButton: {
            contained: {
                color: "rgb(15, 20, 25)"
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(0, 0, 0, 0.4)"
            }
        }
    }
}));
