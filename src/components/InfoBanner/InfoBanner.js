import React from "react";
import "./infobanner.scss";
import { CSSTransition } from "react-transition-group";

const InfoBanner = (props) => {
  return (
    <div>
      <CSSTransition
        onEnter={() => console.log("ETERED")}
        in={props.in}
        timeout={500}
        classNames="banner-t"
      >
        <div className="banner-container">{props.message}</div>
      </CSSTransition>
    </div>
  );
};

export { InfoBanner };
