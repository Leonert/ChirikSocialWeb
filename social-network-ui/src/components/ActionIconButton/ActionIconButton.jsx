import React, { FC, ReactElement, useState } from "react";
import {IconButton } from "@material-ui/core";
import {useActionIconButtonStyles} from "./ActionIconButtonStyles";

const HOVER_DELAY = 500;
interface ActionIconButtonProps {
    id?: string;
    onClick?: any;
    actionText: string;
    size?: "medium" | "small";
    disabled?: boolean;
}

const ActionIconButton: FC<ActionIconButtonProps> = (
    {
        id,
        onClick,
        icon,
        size = "small",
        disabled
    }
): ReactElement => {
    const classes = useActionIconButtonStyles();
    const [delayHandler, setDelayHandler] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [visibleHoverAction, setVisibleHoverAction] = useState(false);

    const handleHoverAction = (): void => {
        setDelayHandler(setTimeout(() => setVisibleHoverAction(true), HOVER_DELAY));
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleHoverAction(false);
    };

    return(
        <div id={id} className={classes.icon}>
            <IconButton
                onClick={onClick}
                onMouseEnter={handleHoverAction}
                onMouseLeave={handleLeaveAction}
                disabled={disabled}
                color="primary"
                size={size}
                >
                <>{icon}</>
            </IconButton>
        </div>
    );
}
export default ActionIconButton