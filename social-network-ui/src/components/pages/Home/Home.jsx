import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderMain from "../../HeaderMain/HeaderMain";
import ButtonShowMore from "../../ButtonShowMore/ButtonShowMore";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import PostList from "../../PostList/PostList";
import Following from "../../Following/Following";
import { getPost } from "../../../features/slices/homeSlice";

function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);

  const dispatch = useDispatch();
  const fetchPost = () => {
    fetch("./data.json")
      .then((r) => r.json())
      .then((products) => {
        dispatch(getPost(products));
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);
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
