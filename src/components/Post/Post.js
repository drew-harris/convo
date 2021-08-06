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

  let ageString = "";
  if (created) {
    const difference = (Date.now() - created.toMillis()) / 60000;
    if (Math.floor(difference / 1440) > 0) {
      ageString = Math.floor(difference / 1440) + "d";
      console.log(difference);
    } else if (Math.floor(difference / 60) > 0) {
      ageString = Math.floor(difference / 60) + "h";
    } else if (Math.floor(difference)) {
      ageString = Math.floor(difference) + "m";
    } else {
      ageString = "";
    }
  }

  // GIT: SHOWING COLOR FOR DEBUG ONLY

  return (
    <>
      <div className={"post-container convo-bg-" + groupInfo.color}>
        <div className="post-top">
          <div className="post-topinfo">
            <div className="post-author">{creator}</div>
            <div className="post-grouplink" onClick={redirect}>
              {groupInfo.groupName}
            </div>
            <div className="post-timestamp">{ageString}</div>
          </div>

          <div className="post-maintext">{groupInfo.color}</div>
        </div>
        <div className="post-bottom">
          <Comments id={id} groupInfo={groupInfo} />
        </div>
      </div>
    </>
  );
};

export { Post };
