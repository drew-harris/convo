import React from "react";
import { remoteConfig } from "../../../firebase/firebase";
import "./hypescreen.scss";
const HypeScreen = (props) => {
  return (
    <div className="hypescreen ">
      <div className="hypescreen-message convo-bg-rainbow">
        CONVO
        <br></br>
        {remoteConfig.getString("hype_message")}
      </div>
    </div>
  );
};

export { HypeScreen };
