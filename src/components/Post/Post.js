import React from "react";
import "./post.scss";

const Post = (props) => {
  const { creator, members, id, groupInfo, text, created } = props.data;

  return (
    <div className={"post-container convo-bg-" + groupInfo.color}>
      <div className="posts-top">
        <div className="posts-topinfo">
          <div className="posts-author">{creator}</div>
          <div className="posts-grouplink">{groupInfo.groupName}</div>
          <div className="posts-timestamp">6hr</div>
        </div>

        <div className="posts-maintext">{text}</div>
      </div>
      <div className="posts-bottom">Discussion Here</div>
    </div>
  );
};

export { Post };
