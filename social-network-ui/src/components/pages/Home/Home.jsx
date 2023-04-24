import React from "react";
import { useSelector } from "react-redux";
import HeaderMain from "../../HeaderMain/HeaderMain";
import ButtonShowMore from "../../ButtonShowMore/ButtonShowMore";
import { Box } from "@mui/material";
import PostList from "../../PostList/PostList";
import Following from "../../Following/Following";
function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
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
      {recommendation && <PostList />}
      {following && <Following />}
    </Box>
  );
}

export default Home;
