import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./deletegroup.scss";

const DeleteGroup = ({ id }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="deletegroup-icon-container" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>

      {open ? (
        <div className="deletegroup-overlay-clickoff">
          <div className="deletegroup-overlay-box">
            <div>Are you sure you want to delete this group?</div>
            <div className="deletegroup-button-container">
              <button className="deletegroup-button">Yes</button>
              <button className="deletegroup-button">Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { DeleteGroup };
