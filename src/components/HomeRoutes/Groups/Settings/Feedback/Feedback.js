import React, { useState } from "react";

const Feedback = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="settings-popup-option" onClick={() => setOpen(true)}>
        Feedback
      </div>
      {open ? (
        <div className="feedback">
          <div className="title">Feedback</div>
        </div>
      ) : null}
    </>
  );
};

export { Feedback };
