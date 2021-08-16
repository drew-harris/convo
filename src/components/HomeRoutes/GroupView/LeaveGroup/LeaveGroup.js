import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { analytics, functions, auth } from "../../../../firebase/firebase";
import { useHistory } from "react-router";
import React from "react";

const LeaveGroup = ({ id, remove }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const leave = async () => {
    remove(auth.currentUser.displayName);
    history.replace("/groups");
  }

  return (
    <>
      <div className="deletegroup-icon-container" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faDoorOpen} />
      </div>

      {open ? (
        <div
          className="deletegroup-overlay-clickoff"
          onClick={() => setOpen(false)}
        >
          <div className="deletegroup-overlay-box">
            <div>Are you sure you want to leave this group?</div>
            <div className="deletegroup-button-container">
              <button className="deletegroup-button red" onClick={leave}>
                Leave
              </button>
              <button className="deletegroup-button">Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { LeaveGroup };
