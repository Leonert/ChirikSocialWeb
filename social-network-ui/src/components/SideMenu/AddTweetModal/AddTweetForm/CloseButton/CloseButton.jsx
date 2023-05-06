import React from "react";
import { useCloseButtonStyles } from "./CloseButtonStyles";
import {CloseIcon} from "../../../../../icon";
import ActionIconButton from "../../../../ActionIconButton/ActionIconButton";




const CloseButton = ({ onClose }) => {
    const classes = useCloseButtonStyles();

    return (
        <div className={classes.close}>
            <ActionIconButton actionText={"Close"} onClick={onClose} icon={CloseIcon} />
        </div>
    );
};

export default CloseButton;
