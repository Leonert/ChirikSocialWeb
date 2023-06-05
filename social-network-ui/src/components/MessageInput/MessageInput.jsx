import { withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

export const MessageInput = withStyles((theme) => ({

    root: {
        '& .MuiOutlinedInput-root': {
            marginTop: 2,
            borderRadius: 5,
            padding: "10px 20px",
            border: "1px solid rgb(37, 51, 65)",
            width: 550,
            '&.Mui-focused': {
                '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.dark },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
            '&:hover': {
                '& fieldset': { borderColor: 'transparent' },
            },
            '& fieldset': {
                borderColor: 'transparent',
                borderWidth: 1,
            },
        },
        '& .MuiOutlinedInput-input': {
            color: 'rgb(255,255,255)',

            "&::placeholder": {
                color: 'rgb(255,255,255)',
            },

        },
    },
}))(TextField);