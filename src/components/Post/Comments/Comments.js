import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../../firebase/firebase";
import "./comments.scss";

const Comments = (props) => {
  //TODO: Clean up JSX
  const [commentText, setCommentText] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const ref = db
    .collection("groups")
    .doc(props.groupInfo.id)
    .collection("posts")
    .doc(props.id)
    .collection("comments");

  useEffect(() => {
    const initial = async () => {
      const unsubscribe = ref.onSnapshot((querySnap) => {
        var posts = [];
        querySnap.forEach((doc) => {
          posts.push(doc.data());
        });
        setData(posts);
        console.log(posts);
      });
    };
    initial();
    return () => {};
  }, []);

  return (
    <>
      <div className="post-latest-comment">Drewh: yea</div>
      <div className="post-viewcomments" onClick={() => setOpen(true)}>
        {"View Messages (" + "8" + ")"}
      </div>

      {open ? (
        <>
          <div
            className="comments-overlay-clickoff"
            onClick={() => {
              setOpen(false);
            }}
          ></div>
          <div className="comments">
            <div className="comments-headerbar">
              Messages
              <div
                className="comments-closebutton"
                onClick={() => {
                  setOpen(false);
                }}
              >
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
      ) : null}
    </>
  );
};

export { Comments };
