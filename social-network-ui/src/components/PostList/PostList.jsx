import React from "react";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPost } from "../../features/slices/homeSlice";
export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.home.post);
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

  console.log(posts);

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post
            key={+post.id}
            avatar={post.avatar}
            name={post.nickname}
            retweet={post.retweet}
            like={post.like}
            view={post.view}
            replay={post.replay}
            content={post.post}
            data={post.data}
            image={post.img}
          />
        ))}
    </div>
  );
}
