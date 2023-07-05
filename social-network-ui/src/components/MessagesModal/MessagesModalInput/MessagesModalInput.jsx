import TextField from "@material-ui/core/TextField";
import {styled} from "@mui/material";


export const MessagesModalInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused': {
            '& svg path': {
                fill: theme.palette.primary.main,
            },
        },
        '& fieldset': {
            border: 0,
            color: 'rgb(255, 255, 255)',
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
        color: 'rgb(255, 255, 255)',
    },
}));

