import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "../UI/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  changeStatusRecommendation,
  changeStatusFollowing,
} from "../../features/slices/homeSlice";
export default function HeaderMain() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const dispatch = useDispatch();
  return (
    <Grid
      container
      sx={{
        p: 1,
        backgroundColor: "rgba(253, 252, 252, 0.3)",
        width: "33%",
        border: "1px solid #faf5f5",
        justifyContent: "space-between",
        position: "fixed",
        top: "5px",
        left: "33%",
      }}
    >
      <Grid item xs={12} sm={12} md={12}>
        <h2 style={{ paddingLeft: "20px", margin: "0 0 20px 0 " }}>Home</h2>
      </Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => dispatch(changeStatusRecommendation())}
          sx={{
            backgroundColor: "transparent",
          }}
        >
          For you
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          onClick={() => dispatch(changeStatusFollowing())}
          sx={{
            backgroundColor: "transparent",
          }}
        >
          Following
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {recommendation && (
          <Box
            sx={{
              width: 65,
              height: 2,
              backgroundColor: "primary.dark",
            }}
          />
        )}
      </Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {following && (
          <Box
            sx={{
              width: 75,
              height: 2,
              backgroundColor: "primary.dark",
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
