import {makeStyles} from "@mui/styles";

export const useMessagesModalStyles = makeStyles((theme) => ({

    header: {
        margin: 0,
        backgroundColor: theme.palette.background.default,
        border: 0,
        "& svg": {
            fontSize: 26,
        },
    },
    headerMessage: {
        marginLeft: 15,

    },
    button: {
        marginLeft: "auto",

        display: "flex",
        justifyContent:"space-around",
        height: 30,
    },
    content: {
        height: 550,
        width: 598,
        padding: 0,
        backgroundColor: theme.palette.background.lightDefault,

    },
    divider: {
        height: 1,
        backgroundColor: theme.palette.background.lightDefault,
    },
}));
