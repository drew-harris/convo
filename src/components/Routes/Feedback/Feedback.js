import React, { useState } from "react";
import { auth, db, timestamp } from "../../../firebase/firebase";
import { APP_VERSION } from "../../../constants";
import { useHistory } from "react-router";
import "./feedback.scss";

const Feedback = () => {
  const [text, setText] = useState("");
  const history = useHistory();

  const submit = () => {
    if (text.length > 4) {
      try {
        db.collection("feedback").add({
          submitted: timestamp(),
          username: auth.currentUser.displayName,
          text,
        });
      } catch (err) {
        console.error(err.message);
        alert("There was an error submitting your feedback");
      }
      history.replace("/groups");
    }
  };

  return (
    <div className="feedback">
      <div className="title">Feedback</div>
      <div className="information">
        Submit: bugs, glitches, ideas, suggestions, etc.
        <br />
        Your username will be included with your submission.
      </div>

      <div className="form-container">
        <textarea
          placeholder="Enter feedback here"
          rows={4}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button className="submit-button" onClick={submit}>
          Submit
        </button>
      </div>
      <div className="version">v{APP_VERSION}</div>
    </div>
  );
};

export { Feedback };
