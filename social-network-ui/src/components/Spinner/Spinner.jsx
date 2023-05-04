import React from 'react';
import {useSpinnerStyles} from "./SpinnerStyles";

const Spinner = ({paddingTop}) => {
    const classes = useSpinnerStyles({paddingTop});

    return (
        <div className={classes.loading}>
            <div className={classes.spinner}>
                <svg viewBox="0 0 32 32">
                    <circle cx="16" cy="16" fill="none" r="14" className={classes.backCircle}/>
                    <circle cx="16" cy="16" fill="none" r="14" className={classes.frontCircle}/>
                </svg>
            </div>
        </div>
    );
};

export default Spinner;
