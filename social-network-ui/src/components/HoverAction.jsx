const HoverAction = ({ visible, positionTop, actionText }) => {
    const classes = useHoverActionStyles({ positionTop });

    if (visible) {
        return (
            <div className={classes.container}>
                <span id="action-text">{actionText}</span>
            </div>
        );
    } else {
        return null;
    }
};

export default HoverAction;