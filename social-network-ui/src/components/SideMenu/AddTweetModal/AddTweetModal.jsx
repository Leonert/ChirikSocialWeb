import React, {FC, ReactElement} from "react";
import {useAddTweetModalStyles} from "./AddTweetModalStyles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import CloseButton from "./AddTweetForm/CloseButton/CloseButton";
import AddTweetForm from "./AddTweetForm/AddTweetForm";


interface AddTweetModalProps {
    title?: string;
    visible?: boolean;
    onClose: () => void;
}
const AddTweetModal: FC<AddTweetModalProps> = ({ title, visible, onClose }): ReactElement | null => {
    const classes = useAddTweetModalStyles();

    return (
            <Dialog className={classes.content} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.header} id="form-dialog-title">
                    <CloseButton onClose={onClose} />
                    {title}
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <AddTweetForm
                        maxRows={6}
                        minRows={6}
                        title={"What's happening?"}
                        buttonName={"Tweet"} />
                </DialogContent>
            </Dialog>
        );
}
export default AddTweetModal