import React, {ReactElement} from "react";
import {useSideMenuStyles} from "./SideMenuStyles";
import {Hidden, IconButton, Typography} from "@mui/material";
import CreateIcon from "@material-ui/icons/Create";


import {
    BookmarksIcon,
    ExploreIcon,
    HomeIconFilled, ListsIcon,
    MessagesIcon,
    NotificationsIcon, ProfileIcon,
    TweetIcon
} from "../../icon";
import {Button} from "@material-ui/core";

const SideMenu = (): ReactElement => {
    const classes = useSideMenuStyles();

    return (
        <>
           <ul className={classes.container}>
               <li>
                   <div className={classes.logoIcon}>
                       <IconButton>
                            {TweetIcon}
                        </IconButton>
                    </div>
                </li>
                <li className={classes.itemWrapper}>
                    <div>
                        <Hidden smDown>
                            <>
                                <span>{HomeIconFilled}</span>
                                <Typography variant={"h5"}>
                                    Home
                                </Typography>
                            </>
                        </Hidden>
                    </div>
                </li>
                <li className={classes.itemWrapper}>
                    <div>
                        <Hidden smDown>
                            <>
                                <span>{ExploreIcon}</span>
                                <Typography variant={"h5"}>
                                    Explore
                                </Typography>
                            </>
                        </Hidden>
                    </div>
                </li>
                <li className={classes.itemWrapper}>
                        <div>
                            <Hidden smDown>
                                <>
                                    <span>{NotificationsIcon}</span>
                                    <Typography variant={"h5"}>
                                        Notifications
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                </li>
                <li className={classes.itemWrapper}>

                        <div>
                            <Hidden smDown>
                                <>
                                    <span>{MessagesIcon}</span>
                                    <Typography variant={"h5"}>
                                        Messages
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                </li>
                <li className={classes.itemWrapper}>
                        <div>
                            <Hidden smDown>
                                <>
                                    <span>{BookmarksIcon}</span>
                                    <Typography variant={"h5"}>
                                        Bookmarks
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                </li>
                <li className={classes.itemWrapper}>

                        <div>
                            <Hidden smDown>
                                <>
                                    <span>{ListsIcon}</span>
                                    <Typography variant={"h5"}>
                                        Lists
                                    </Typography>
                                </>
                            </Hidden>
                        </div>

                </li>
                <li className={classes.itemWrapper}>

                        <div>
                            <Hidden smDown>
                                <>
                                    <span>{ProfileIcon}</span>
                                    <Typography variant={"h5"}>
                                        Profile
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                </li>
               <li className={classes.itemWrapper}>
                   <Button
                       className={classes.button}
                       variant="contained"
                       color="primary"
                       fullWidth
                   >
                       <Hidden smDown>
                           Tweet
                       </Hidden>
                       <Hidden mdUp>
                           <CreateIcon />
                       </Hidden>
                   </Button>

               </li>
            </ul>
        </>


    );

}
export default SideMenu