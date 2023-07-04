import React from 'react';
import {Avatar,Typography} from "@material-ui/core";



import {useMessagesModalUserStyles} from "./MessagesModalUserStyles";
import {ListItemAvatar} from "@mui/material";


const MessagesModalUser = ({ user }) => {
    const classes = useMessagesModalUserStyles();

    return (
        <div className={classes.container}>
            <ListItemAvatar>
                <Avatar src={user.profileImage} />
            </ListItemAvatar>
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

export default MessagesModalUser