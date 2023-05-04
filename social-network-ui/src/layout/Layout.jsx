import React from 'react';
import {Container, Grid} from '@material-ui/core';

import SideMenu from "../components/SideMenu/SideMenu";

import {useLayoutStyles} from "./LayoutStyles";
import {Outlet} from "react-router-dom";



export const Layout = () => {
    const classes = useLayoutStyles();

    return (
        <Container className={classes.wrapper} maxWidth="lg">
            <Grid sm={1} md={2} item style={{minWidth: "256px"}}>
                <SideMenu/>
            </Grid>
            <Grid container spacing={3}>
                <Outlet />
            </Grid>
        </Container>
  );
};
