import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { db, auth, timestamp } from "../../../firebase/firebase";
import { CSSTransition } from "react-transition-group";
import "./comments.scss";

const Bubble = ({ username, text, created, color }) => {
  if (username === auth.currentUser.displayName) {
    return (
      <div className="bubble bubble-mine ">
        <div className={"bubble-content convo-bg-" + color}>
          <div className="bubble-text">{text}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bubble ">
        <div className="bubble-username">{username}</div>
        <div className="bubble-content bubble-other">
          <div className="bubble-text">{text}</div>
        </div>
      </div>
    );
  }
};

const Comments = (props) => {
  //TODO: Clean up JSX
  const [commentText, setCommentText] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const ref = db
    .collection("groups")
    .doc(props.groupInfo.groupId)
    .collection("posts")
    .doc(props.id)
    .collection("comments");

  const addComment = async () => {
    try {
      ref.add({
        username: auth.currentUser.displayName,
        text: commentText,
        created: timestamp(),
      });
      setCommentText("");
    } catch (err) {
      /* handle error */
      console.err(err.message);
    }
  };

  const setUpDataStream = async () => {
    const initial = async () => {
      const unsubscribe = ref
        .orderBy("created", "desc")
        .onSnapshot((querySnap) => {
          var comments = [];
          querySnap.forEach((doc) => {
            comments.push(doc.data());
          });
          setData(comments);
        });
      return unsubscribe;
    };
    const unsubscribe = await initial();
  };

  useEffect(() => {
    try {
      ref
        .orderBy("created", "desc")
        .get()
        .then((querySnapshot) => {
          let comments = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            comments.push(doc.data());
          });
          setData(comments);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } catch (err) {
      console.error(err.message);
      /* handle error */
    }
    return () => {};
  }, []);

  const bubbles = data.map((data) => {
    return (
      <Bubble
        username={data.username}
        text={data.text}
        created={data.created}
        key={data.created}
        color={props.groupInfo.color}
      />
    );
  });

  let latest = null;
  if (data.length > 0) {
    latest = data[0];
  }

  //TODO: Refactor latest comment area
  return (
    <>
      {latest ? (
        <div className="post-latestcomment">
          {latest.username + ": " + latest.text}
        </div>
      ) : null}
      <div
        className="post-viewcomments"
        onClick={() => {
          setOpen(true);
          setUpDataStream();
        }}
      >
        {"View Messages (" + data.length + ")"}
      </div>

      {open ? (
        <>
          <div
            className="comments-overlay-clickoff"
            onClick={() => {
              setOpen(false);
            }}
          ></div>
        </>
      ) : null}
      <CSSTransition in={open} timeout={100} classNames="comments-trans">
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
          <div className="comments-bubblecontainer">{bubbles}</div>
          <div className="comments-add-container">
            <input
              className="comments-add-textfield"
              type="text"
              placeholder="Add a comment"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
            />
            {commentText.length > 1 ? (
              <div className="comments-add-sendbutton" onClick={addComment}>
                Send
              </div>
            ) : null}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export { Comments };
