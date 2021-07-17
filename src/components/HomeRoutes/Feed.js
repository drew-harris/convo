import React from "react";
import "./feed.scss";
import { auth } from "../../firebase/firebase";

const Feed = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}> Sign Out </button>
    </div>
  );
};

export { Feed };
