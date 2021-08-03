import React from "react";
import "./feed.scss";
import { auth } from "../../../firebase/firebase";
import { NewPost } from "./NewPost/NewPost";

const Feed = () => {
  return (
    <div className="feed-screen">
      <NewPost />
    </div>
  );
};

export { Feed };
