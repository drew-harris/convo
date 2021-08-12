import React, { useState } from "react";
import "../groupview.scss";
import "./addmemberoverlay.scss";
import { CSSTransition } from "react-transition-group";
import { MemberPill } from "../MemberPill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddMemberOverlay = (props) => {
  const [filterInput, setFilterInput] = useState("");

  const memberPills = props.names.map((name) => {
    if (name.toLowerCase().includes(filterInput.toLowerCase())) {
      return (
        <MemberPill
          name={name}
          color="white"
          key={name}
          handleTouch={props.handleTouch}
        />
      );
    }
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
        <input
          placeholder="Search"
          className="addmemberoverlay-filterinput"
          type="text"
          value={filterInput}
          onChange={(event) => setFilterInput(event.target.value)}
        />
        <div className="addmemberoverlay-pillcontainer">{memberPills}</div>
      </div>
    </CSSTransition>
  );
};

export { AddMemberOverlay };
