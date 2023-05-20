import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@mui/styles";

export const MessagesModalInput = withStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                '& svg path': {
                    fill: theme.palette.primary.dark,
                },
            },
            '& fieldset': {
                border: 0,
            },
            '& .MuiInputAdornment-root': {
                '& svg': {
                    color: 'rgb(83, 100, 113)',
                    height: '1.25em',
                },
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 14px 14px 5px',
            color: theme.palette.text.primary,

        },
    },
}))(TextField);