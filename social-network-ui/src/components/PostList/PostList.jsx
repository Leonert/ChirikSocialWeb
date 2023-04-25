import React from "react";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";

import { getPost } from "../../features/slices/homeSlice";
export default function PostList() {
 
  const posts = useSelector((state) => state.home.post);


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
