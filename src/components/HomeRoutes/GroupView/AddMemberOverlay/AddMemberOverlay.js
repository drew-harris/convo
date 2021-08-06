import React from "react";
import "../groupview.scss";
import "./addmemberoverlay.scss";
import { CSSTransition } from "react-transition-group";
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
  return (
    <CSSTransition
      in={props.open}
      timeout={100}
      classNames="addmemberoverlay-t"
    >
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
    </CSSTransition>
  );
};

export { AddMemberOverlay };
