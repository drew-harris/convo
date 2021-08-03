import React, { useState } from "react";
import { db, auth } from "../../../../firebase/firebase";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import "./addgroup.scss";

const AddGroup = () => {
  const [open, setOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [color, setColor] = useState("red");

  const createGroup = async () => {
    console.log(nameInput);
    try {
      if (nameInput && color) {
        let docref = db.collection("groups").doc();
        docref.set({
          id: docref.id,
          name: nameInput || " no title ",
          owners: [auth.currentUser.displayName],
          members: [auth.currentUser.displayName],
          viewers: [],
          color: color,
        });
        console.log(docref.id);
        setOpen(false);
      }
    } catch (e) {
      /* handle error */
      console.log(e.message);
    }
  };

  const handleColorChange = (name) => {
    setColor(name);
  };

  if (open) {
    return (
      <div className="addgroup-container">
        <div>New Group</div>

        <input
          type="text"
          className="addgroup-input"
          placeholder="Group Name"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
        <ColorPicker color={color} onChange={handleColorChange} />
        <div className="addgroup-createbutton" onClick={createGroup}>
          Create
        </div>
      </div>
    );
  } else {
    return (
      <div className="addgroup-container" onClick={() => setOpen(true)}>
        New Group
      </div>
    );
  }
};

export { AddGroup };
