import React, {ChangeEvent, FC, ReactElement, useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useAddTweetFormStyles } from "./AddTweetFormStyles";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import {EmojiIcon, MediaIcon} from "../../../../icon";
import {useDispatch} from "react-redux";
import { useParams } from "react-router-dom";

export interface AddTweetFormProps {
    maxRows?: number;
    minRows?: number;
    tweetId?: number;
    title: string;
    buttonName: string;
    addressedUsername?: string;
    addressedId?: number;
    onCloseModal?: () => void;
}
const MAX_LENGTH = 280;
const AddTweetForm: FC<AddTweetFormProps> = (
    {
        unsentTweet,
        quoteTweet,
        maxRows,
        title,
        buttonName,
        onCloseModal
    }
): ReactElement => {

    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
    const [visiblePoll, setVisiblePoll] = useState(false);
    const classes = useAddTweetFormStyles({ quoteTweet: quoteTweet, isScheduled: selectedScheduleDate !== null });
    const textLimitPercent = Math.round((text.length / 280) * 100);
    const textCount = MAX_LENGTH - text.length;
    const fileInputRef = useRef(null);
    const params = useParams();

    const handleClickImage = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Loading File:', file);
    };



    const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);
    };
    const uploadTweetImages = async (): Promise<Array> => {

    };
    const handleClickAddTweet = async (): Promise<void> => {
        const result = await uploadTweetImages();

        if (visiblePoll) {
            dispatch(({
                images: result,
            }));
        } else if (selectedScheduleDate !== null && unsentTweet === undefined) {
            dispatch(({
                images: result,
                scheduledDate: selectedScheduleDate
            }));
        } else if (unsentTweet) {
            dispatch(({
                id: unsentTweet?.id,
                images: result,
            }));
            if (onCloseModal) onCloseModal();
        }
        dispatch((selectedScheduleDate ? (
            `Your Tweet will be sent on`
        ) : (
            "Your tweet was sent."
        )));
        setText("");
        setVisiblePoll(false);
        setSelectedScheduleDate(null);
    };

    const handleClickQuoteTweet = async (): Promise<void> => {
        const result = await uploadTweetImages();
        dispatch(({
            images: result,
            tweetId: quoteTweet.id,
            userId: params.userId
    }));
        dispatch(("Your tweet was sent."));
        setText("");
        if (onCloseModal) onCloseModal();
    };
    const handleClickReplyTweet = async (): Promise<void> => {
        dispatch(("Your tweet was sent."));
        setText("");
        if (onCloseModal) onCloseModal();
    };

    return (
        <>
            <div className={classes.content}>
                <ProfileAvatar />
                <div className={classes.textareaWrapper}>
                    <TextareaAutosize
                        onChange={handleChangeTextarea}
                        className={classes.contentTextarea}
                        placeholder={visiblePoll ? "Ask a question..." : title}
                        value={text}
                        maxRows={maxRows}
                    />
                </div>
            </div>
            <div className={classes.footer}>
                <div className={classes.footerWrapper}>
                    {(buttonName !== "Reply") && (
                        <div className={classes.quoteImage}>
                            <ActionIconButton
                                actionText={"Media"}
                                icon={MediaIcon}
                                onClick={handleClickImage}
                                size={"medium"}
                            />
                            <ActionIconButton
                                id={"onClickAddEmoji"}
                                actionText={"Emoji"}
                                icon={EmojiIcon}
                                size={"medium"}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>
                <div className={classes.footerAddForm}>
                    {text && (
                        <>
                            <span id={"textCount"}>{textCount}</span>
                            <div className={classes.footerAddFormCircleProgress}>
                                <CircularProgress
                                    variant="determinate"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                                    style={text.length >= MAX_LENGTH ? { color: "red" } : undefined}
                                />
                                <CircularProgress
                                    style={{ color: "rgba(0, 0, 0, 0.1)" }}
                                    variant="determinate"
                                    size={20}
                                    thickness={5}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    <Button
                        onClick={(buttonName === "Reply") ? handleClickReplyTweet :
                            (quoteTweet !== undefined ? handleClickQuoteTweet : handleClickAddTweet)}
                        disabled={
                            visiblePoll ? (
                                !text || text.length >= MAX_LENGTH
                            ) : (
                                !text || text.length >= MAX_LENGTH
                            )}
                        color="primary"
                        variant="contained"
                    >
                        {buttonName}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddTweetForm;
