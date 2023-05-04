import { makeStyles } from "@material-ui/core";

export const useCloseButtonStyles = makeStyles((theme) => ({
    close: {
        "& .MuiIconButton-root": {
            marginRight: 15
        }
    }
}));