import React, { useState } from "react";
import "./groupselect.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const GroupSelect = (props) => {
  const Item = (props) => {
    return (
      <div
        className="groupselect-item"
        onClick={() => {
          props.onChange(props.data);
          setOpen(false);
        }}
      >
        {props.data.name}
      </div>
    );
  };

  const [open, setOpen] = useState(false);

  const items = props.data.map((data) => {
    return <Item onChange={props.onChange} data={data} key={data.id} />;
  });

  return (
    <div className="groupselect-container">
      <div className="groupselect-top-container" onClick={() => setOpen(!open)}>
        {props.selected ? props.selected.name : "Select Group"}
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {open ? <div className="groupselect-items-container">{items}</div> : null}
    </div>
  );
};

export { GroupSelect };
