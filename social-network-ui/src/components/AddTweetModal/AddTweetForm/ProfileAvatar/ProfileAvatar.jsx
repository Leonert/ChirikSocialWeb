import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useGlobalStyles } from "../../../../util/globalClasses";
import {PROFILE} from "../../../../util/path-constants";
import {Avatar} from "@material-ui/core";

const ProfileAvatar= memo(() => {
    const globalClasses= useGlobalStyles();

    return (
        <Link to={`${PROFILE}`}>
            <Avatar className={globalClasses.avatar}/>
        </Link>
    );
});

ProfileAvatar.displayName = "ProfileAvatar";
export default ProfileAvatar
