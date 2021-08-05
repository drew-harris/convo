import React, { useState } from "react";
import "./post.scss";
import { Comments } from "./Comments/Comments";
import { useHistory } from "react-router";

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
  const history = useHistory();

  const redirect = () => {
    history.replace("/groups/" + groupInfo.groupId);
  };

  return (
    <>
      <div className={"post-container convo-bg-" + groupInfo.color}>
        <div className="post-top">
          <div className="post-topinfo">
            <div className="post-author">{creator}</div>
            <div className="post-grouplink" onClick={redirect}>
              {groupInfo.groupName}
            </div>
            <div className="post-timestamp">6hr</div>
          </div>

          <div className="post-maintext">{text}</div>
        </div>
        <div className="post-bottom">
          <Comments id={id} groupInfo={groupInfo} />
        </div>
      </div>
    </>
  );
};

export { Post };
