import React from "react";
import "../groupview.scss";
import "./addmemberoverlay.scss";
import { MemberPill } from "../MemberPill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddMemberOverlay = (props) => {
  const memberPills = props.names.map((name) => {
    return (
      <MemberPill
        name={name}
        color="white"
        key={name}
        handleTouch={props.handleTouch}
      />
    );
  });
  if (props.open) {
    return (
      <div className="addmemberoverlay-container">
        <div className="addmemberoverlay-header">
          Edit Users
          <div
            className="addmemberoverlay-closeicon"
            onClick={props.handleClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <div className="addmemberoverlay-pillcontainer">{memberPills}</div>
      </div>
    );
  } else {
    return null;
  }
};

export { AddMemberOverlay };
