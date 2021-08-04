import React from "react";
import "./feed.scss";
import { auth } from "../../../firebase/firebase";
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
