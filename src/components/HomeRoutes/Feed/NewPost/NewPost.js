import React, { useState, useEffect } from "react";
import { db, auth, timestamp } from "../../../../firebase/firebase";
import { GroupSelect } from "./GroupSelect/GroupSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const NewPost = (props) => {
  const [open, setOpen] = useState(false);

  const [pickerData, setPickerData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [postText, setPostText] = useState("");

  const pickerChange = (selection) => {
    console.log(selection);
    setSelected(selection);
  };

  const addPost = async () => {
    try {
      if (selected === null) {
        throw new Error("Please select a group to post to.");
      }
      if (postText.length < 3) {
        throw new Error("Please enter text to post");
      }

      let groupRef = db.collection("groups").doc(selected.id);
      const snap = await groupRef.get();
      const members = await snap.get("members");
      console.log(members);

      let docref = db
        .collection("groups")
        .doc(selected.id)
        .collection("posts")
        .doc();

      docref.set({
        id: docref.id,
        members: members,
        groupInfo: {
          groupRef: groupRef,
          groupName: selected.name,
          groupId: selected.id,
          color: selected.color,
        },
        creator: auth.currentUser.displayName,
        created: timestamp(),
        text: postText,
        lastComment: null,
        commentCount: 0,
      });

      // Close the add post component
      setSelected(null);
      setPostText("");
      setOpen(false);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  useEffect(() => {
    try {
      db.collection("groups")
        .where("members", "array-contains", auth.currentUser.displayName)
        .get()
        .then((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push({
              name: doc.data().name,
              id: doc.data().id,
              color: doc.data().color,
            });
          });
          setPickerData(data);
        });
    } catch (err) {
      /* handle error */
      console.error(err.message);
    }
  }, []);

  if (open) {
    return (
      <div
        className={
          open
            ? "newpost-container newpost-open"
            : "newpost-container newpost-closed"
        }
      >
        <span className="newpost-titleandclose">
          New Post
          <div className="newpost-closeicon" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </span>
        <GroupSelect
          data={pickerData}
          selected={selected}
          onChange={pickerChange}
        />
        <textarea
          placeholder="Enter Text Here"
          type="text"
          cols="auto"
          rows={3}
          className="newpost-input"
          value={postText}
          onChange={(event) => setPostText(event.target.value)}
        />

        <div className="newpost-createbutton" onClick={addPost}>
          Post
        </div>
      </div>
    );
  } else {
    return (
      <div className="newpost-container" onClick={() => setOpen(true)}>
        New Post
      </div>
    );
  }
};

export { NewPost };
