import React from "react";
import HeaderMain from "../../HeaderMain/HeaderMain";
import ButtonShowMore from "../../ButtonShowMore/ButtonShowMore";
import { Box } from "@mui/material";
import Post from "../../Post/Post";

function Home() {
  return (
    <Box
      sx={{
        width: "33%",
        backgroundColor: " #1e2028",
        display: "grid",
        marginLeft: "33%",
        paddingTop: "114px",
        paddingBottom: "20px",
      }}
    >
      <HeaderMain />
      <ButtonShowMore />
      <Post />
    </Box>
  );
}

export default Home;
