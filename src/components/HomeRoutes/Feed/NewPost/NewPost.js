import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../firebase/firebase";
import { GroupSelect } from "./GroupSelect/GroupSelect";

const NewPost = (props) => {
  const [open, setOpen] = useState(false);

  const [pickerData, setPickerData] = useState(null);
  const [selected, setSelected] = useState(null);

  const pickerChange = (selection) => {
    console.log(selection);
    setSelected(selection);
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
          console.table(data);
        });
    } catch (err) {
      /* handle error */
      console.error(err.message);
    }
  }, []);

  if (open) {
    return (
      <div className="newpost-container">
        <div>New Post</div>
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
        />

        <div className="newpost-createbutton">Post</div>
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
