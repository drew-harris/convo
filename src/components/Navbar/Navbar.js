import React from "react";
import { useEffect } from "react";
import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log(location);
  });

  let chatIconClass = "navbar-icon-container";
  let groupsIconClass = "navbar-icon-container";

  if (location.pathname === "/") {
    chatIconClass = "navbar-icon-container navbar-icon-active";
    groupsIconClass = "navbar-icon-container";
  } else if (location.pathname === "/groups") {
    chatIconClass = "navbar-icon-container";
    groupsIconClass = "navbar-icon-container navbar-icon-active";
  }

  return (
    <div className="navbar">
      <div className={chatIconClass} onClick={() => history.replace("/")}>
        <FontAwesomeIcon icon={faCommentAlt} />
      </div>
      <div
        className={groupsIconClass}
        onClick={() => history.replace("/groups")}
      >
        <FontAwesomeIcon icon={faUserFriends} />
      </div>
    </div>
  );
};

export { Navbar };
