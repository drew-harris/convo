import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { analytics, functions } from "../../../../firebase/firebase";
import { useHistory } from "react-router";
import React from "react";
import "./deletegroup.scss";

const DeleteGroup = ({ id, setDeleting }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const deleteGroup = async () => {
    try {
      var cloudDelete = functions.httpsCallable("recursiveDelete");
      cloudDelete({ path: id }).then((result) => {
        // Read result of the Cloud Function.
        history.push("/groups");
      });
      setDeleting();
      analytics.logEvent("delete_group", { group_id: id });
    } catch (err) {
      console.error(err.message);
      alert("There was an error deleting your group");
    }
  };

  return (
    <>
      <div className="deletegroup-icon-container" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>

      {open ? (
        <div
          className="deletegroup-overlay-clickoff"
          onClick={() => setOpen(false)}
        >
          <div className="deletegroup-overlay-box">
            <div>Are you sure you want to delete this group?</div>
            <div className="deletegroup-button-container">
              <button className="deletegroup-button red" onClick={deleteGroup}>
                Delete
              </button>
              <button className="deletegroup-button">Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { DeleteGroup };
