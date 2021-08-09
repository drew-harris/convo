import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../../firebase/firebase";
import "./settings.scss";

const Settings = (props) => {
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    const currentValue = window.localStorage.getItem("dark");
    if (currentValue === "dark") {
      window.localStorage.setItem("dark", "light");
    } else {
      window.localStorage.setItem("dark", "dark");
    }
    window.location.reload();
  };

  const logOut = function () {
    auth.signOut();
  };

  return (
    <div className="settings-master-container">
      <div className="settings-icon-container" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faCog} />
      </div>
      {open ? (
        <>
          <div className="settings-popup-container">
            <div className="settings-popup-option" onClick={toggleTheme}>
              Toggle Theme
            </div>
            <div className="settings-popup-option" onClick={logOut}>
              Log Out
            </div>
          </div>
          <div className="clickaway" onClick={() => setOpen(false)}></div>
        </>
      ) : null}
    </div>
  );
};

export { Settings };
