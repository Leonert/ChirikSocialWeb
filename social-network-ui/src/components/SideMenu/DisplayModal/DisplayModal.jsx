import React from 'react';
import {Button, Dialog, DialogContent, Radio, Typography} from "@material-ui/core";
import {CheckCircle, RadioButtonUnchecked} from "@material-ui/icons";

import {useDisplayModalStyles} from "./DisplayModalStyles";
import {CheckIcon, TweetIcon, VerifiedIcon} from "../../../icon";
import {ColorScheme} from "../Display/Display";






const DisplayModal= ({visible, onClose,}
) => {
    const classes = useDisplayModalStyles();
    if (!visible) {
        return null;
    }


    const onClickBackgroundColor = (BackgroundTheme) => {
        processBackgroundColor(BackgroundTheme);
    };

    const processBackgroundColor = (BackgroundTheme) => {

    };

    const onClickColor = (color) => {

    };


    const ColorSelector = ({color}) => {
        return (
            <div
                id={color.toLowerCase()}
                className={classes.colorItem}
                onClick={() => onClickColor(color)}
            >
                <span className={classes.checkIcon}>
                    {CheckIcon}
                </span>
            </div>
        );
    };

    return (
        <Dialog open={visible} onClose={onClose} className={classes.dialog} aria-labelledby="form-dialog-title">
            <Typography variant={"h3"} component={"div"} className={classes.title}>
                Bla Bla
            </Typography>
            <DialogContent className={classes.content}>
                <Typography variant={"subtitle1"} component={"div"} className={classes.text}>
                    Bla Bla
                </Typography>
                <div className={classes.tweetInfoWrapper}>
                    <div>
                        <div className={classes.tweetIconWrapper}>
                            <span className={classes.tweetIcon}>
                                {TweetIcon}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Typography variant={"h6"} component={"span"} className={classes.tweetTitle}>
                                Chirik
                            </Typography>
                            <span className={classes.tweetVerifiedIcon}>
                                {VerifiedIcon}
                            </span>
                            <Typography variant={"subtitle1"} component={"span"}>
                                @Chirik
                            </Typography>
                            <Typography variant={"subtitle1"} component={"span"}>
                                {" · 31m"}
                            </Typography>
                        </div>
                        <Typography variant={"body1"} component={"div"} className={classes.tweetText}>
                           Bla bla bla Chirik <span
                            className={classes.tweetLink}>@Chirik</span>
                        </Typography>
                    </div>
                </div>
                <Typography variant={"subtitle2"} component={"div"} className={classes.subtitle}>
                    Font size
                </Typography>
                <div className={classes.stepperWrapper}>
                    <Typography variant={"body1"} id={"xs"} component={"span"} className={classes.tweetText}>
                        Aa
                    </Typography>
                    <span className={classes.stepper}>
                        <div id={"xs"} className={classes.stepperPoint}/>
                        <div id={"sm"} className={classes.stepperPoint}/>
                        <div id={"md"} className={classes.stepperPoint}/>
                        <div id={"lg"} className={classes.stepperPoint}/>
                        <div id={"xl"} className={classes.stepperPoint}/>
                    </span>
                    <Typography variant={"body1"} id={"xl"} component={"span"} className={classes.tweetText}>
                        Aa
                    </Typography>
                </div>
                <Typography variant={"subtitle2"} component={"div"} className={classes.subtitle}>
                    Color
                </Typography>
                <div className={classes.colorWrapper}>
                    <div className={classes.colorWrapper}>
                        <ColorSelector color={ColorScheme.BLUE}/>
                        <ColorSelector color={ColorScheme.YELLOW}/>
                        <ColorSelector color={ColorScheme.CRIMSON}/>
                        <ColorSelector color={ColorScheme.VIOLET}/>
                        <ColorSelector color={ColorScheme.ORANGE}/>
                        <ColorSelector color={ColorScheme.GREEN}/>
                    </div>
                </div>
                <Typography variant={"subtitle2"} component={"div"} className={classes.subtitle}>
                    Background
                </Typography>
                <div className={classes.backgroundContainer}>
                    <div className={classes.backgroundWrapper}>
                        <div id={"default"} className={classes.backgroundItem}

                        >
                            <div className={classes.backgroundItemWrapper}>
                                <Radio

                                    name="radio-buttons"
                                    inputProps={{"aria-label": "Default"}}
                                    icon={<RadioButtonUnchecked color={"primary"}/>}
                                    checkedIcon={<CheckCircle color={"primary"}/>}
                                    size="small"
                                />
                            </div>
                            <Typography variant={"h6"} component={"span"}>
                                Default
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.backgroundWrapper}>
                        <div id={"dim"} className={classes.backgroundItem}

                        >
                            <div className={classes.backgroundItemWrapper}>
                                <Radio

                                    name="radio-buttons"
                                    inputProps={{"aria-label": "Dim"}}
                                    icon={<RadioButtonUnchecked color={"primary"}/>}
                                    checkedIcon={<CheckCircle color={"primary"}/>}
                                    size="small"
                                />
                            </div>
                            <Typography variant={"h6"} component={"span"}>
                                Dim
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.backgroundWrapper}>
                        <div id={"lights-out"} className={classes.backgroundItem}

                        >
                            <div className={classes.backgroundItemWrapper}>
                                <Radio
                                    name="radio-buttons"
                                    inputProps={{"aria-label": "Lights-out"}}
                                    icon={<RadioButtonUnchecked color={"primary"}/>}
                                    checkedIcon={<CheckCircle color={"primary"}/>}
                                    size="small"
                                />
                            </div>
                            <Typography variant={"h6"} component={"span"}>
                                Lights out
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.buttonWrapper}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DisplayModal;
