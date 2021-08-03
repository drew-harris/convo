import React from "react";
import "../groups.scss";
import { useHistory } from "react-router";

const GroupLink = (props) => {
  const history = useHistory();
  return (
    <div
      className={"grouplink-container convo-bg-" + props.color}
      onClick={() => {
        history.replace("/groups/" + props.id);
      }}
    >
      <div>{props.name || "group name"}</div>
    </div>
  );
};

export { GroupLink };
