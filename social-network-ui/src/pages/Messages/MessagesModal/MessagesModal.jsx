import React, { useState} from 'react';
import {Button, Dialog, InputAdornment, List, ListItem} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import {useMessagesModalStyles} from "./MessagesModalStyles";
import {MessagesModalInput} from "./MessagesModalInput/MessagesModalInput"
import MessagesModalUser from './MessagesModalUser/MessagesModalUser';
import {SearchIcon} from "../../../icon";




const MessagesModal = ({visible, onClose})=> {
    const classes = useMessagesModalStyles();
    const [text] = useState("");
    const [selectedIndex] = useState();


    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" className={classes.header}>
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon color="secondary"/>
                </IconButton>
                <span className={classes.headerMessage}>New message</span>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={selectedIndex === undefined}
                >
                    Next
                </Button>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <form>
                    <MessagesModalInput
                        fullWidth
                        placeholder="Explore people"
                        variant="outlined"
                        value={text}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SearchIcon}
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
                <div className={classes.divider}/>
                <List component="nav" aria-label="main mailbox folders">

                        <ListItem
                            button
                        >
                            <MessagesModalUser/>
                        </ListItem>

                </List>
            </DialogContent>
        </Dialog>
    );
};

export default MessagesModal;
