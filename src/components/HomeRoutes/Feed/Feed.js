import React from "react";
import "./feed.scss";
import { NewPost } from "./NewPost/NewPost";
import { PostsView } from "../../PostsView/PostsView";

const Feed = () => {
  return (
    <div className="feed-screen">
      <NewPost />
      <PostsView />
    </div>
  );
};

export { Feed };
