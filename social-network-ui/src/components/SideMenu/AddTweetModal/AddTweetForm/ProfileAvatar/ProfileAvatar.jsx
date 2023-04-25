import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import {PROFILE} from "../../../../../util/path-constants";
import {Avatar} from "@material-ui/core";

const ProfileAvatar = memo((): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <Link to={`${PROFILE}`}>
            <Avatar className={globalClasses.avatar}/>
        </Link>
    );
});
export default ProfileAvatar;
