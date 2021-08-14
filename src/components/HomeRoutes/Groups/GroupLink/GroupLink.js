import React from "react";
import "../groups.scss";
import { useHistory } from "react-router";
import { analytics } from "../../../../firebase/firebase";

const GroupLink = (props) => {
  const history = useHistory();
  return (
    <div
      className={"grouplink-container convo-bg-" + props.color}
      onClick={() => {
        history.replace("/groups/" + props.id);
        analytics.logEvent("view_group_info", {
          group_id: props.id,
        });
      }}
    >
      <div>{props.name || "group name"}</div>
    </div>
  );
};

export { GroupLink };
