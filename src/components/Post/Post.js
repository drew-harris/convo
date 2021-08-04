import React, { useState } from "react";
import "./post.scss";
import { Comments } from "./Comments/Comments";

const Post = (props) => {
  const {
    creator,
    members,
    id,
    groupInfo,
    text,
    created,
    latestComment,
    commentCount,
  } = props.data;

  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <Comments id={id} groupInfo={groupInfo} close={() => setOpen(false)} />
      ) : null}
      <div className={"post-container convo-bg-" + groupInfo.color}>
        <div className="post-top">
          <div className="post-topinfo">
            <div className="post-author">{creator}</div>
            <div className="post-grouplink">{groupInfo.groupName}</div>
            <div className="post-timestamp">6hr</div>
          </div>

          <div className="post-maintext">{text}</div>
        </div>
        <div className="post-bottom">
          <div className="post-latest-comment">
            {latestComment
              ? latestComment.username + ": " + latestComment.text
              : null}
          </div>
          <div className="post-viewcomments" onClick={() => setOpen(true)}>
            {"View Messages (" + commentCount + ")"}
          </div>
        </div>
      </div>
    </>
  );
};

export { Post };
