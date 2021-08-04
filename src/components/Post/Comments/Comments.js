import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./comments.scss";

const Comments = (props) => {
  const [commentText, setCommentText] = useState("");
  return (
    <>
      <div className="comments-overlay-clickoff" onClick={props.close}></div>
      <div className="comments">
        <div className="comments-headerbar">
          Messages
          <div className="comments-closebutton" onClick={props.close}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <div className="comments-bubblecontainer">
          Bubbles will go here + animation
        </div>
        <div className="comments-add-container">
          <input
            className="comments-add-textfield"
            type="text"
            placeholder="Add a comment"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          {commentText.length > 1 ? (
            <div className="comments-add-sendbutton">Send</div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export { Comments };
