import React from 'react';
import {Avatar,Typography} from "@material-ui/core";
import {ListItemAvatar} from "@mui/material";


const MessagesModalUser = ({ user }) => {

    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            paddingLeft: 15,
            paddingTop: 8,
            paddingBottom: 8,
            cursor: "pointer"
        }}>
            <ListItemAvatar>
                <Avatar src={user.profileImage} />
            </ListItemAvatar>
            <div style={{ flex: 1 }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <div style={{ width: 350 }}>
                        <Typography sx={{
                            width: 5,
                            height: 5,
                            marginRight: 15
                        }}>
                            {user?.fullName}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight:"bold"
                            }}
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