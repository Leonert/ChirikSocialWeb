import React from 'react';
import { Avatar, Typography } from "@material-ui/core";

import { useMessagesModalUserStyles } from "./MessagesModalUserStyles";

const user = {
    avatar: { src: "user-avatar.png" },
    fullName: "John Smith",
    username: "john_smith"
};

const MessagesModalUser = ({ user }) => {
    const classes = useMessagesModalUserStyles();

    return (
        <div className={classes.container}>
            <Avatar className={classes.listAvatar} src={user?.avatar?.src} />
            <div style={{ flex: 1 }}>
                <div className={classes.header}>
                    <div style={{ width: 350 }}>
                        <Typography className={classes.fullName}>
                            {user?.fullName}
                        </Typography>
                        <Typography
                            className={classes.username}
                            variant="caption"
                            display="block"
                            gutterBottom
                        >
                            @{user?.username}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    return <MessagesModalUser user={user} />;
}
