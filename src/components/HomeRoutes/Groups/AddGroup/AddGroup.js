import React, { useState } from "react";
import { db, auth } from "../../../../firebase/firebase";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
        setNameInput("");
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
      <div
        className={
          open
            ? "addgroup-container addgroup-container-open"
            : "addgroup-container"
        }
      >
        <span className="addgroup-titleandclose">
          New Group
          <div className="addgroup-closeicon" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </span>

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
