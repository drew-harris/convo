import React from "react";

const MemberPill = (props) => {
  return (
    <div
      className={"pill pillcolor-" + props.color}
      onClick={() => props.handleTouch(props.name)}
    >
      {props.name}
    </div>
  );
};

export { MemberPill };
