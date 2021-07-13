import React from "react";
import "./signnavcorner.scss";
import { useHistory } from "react-router";

const SignNavCorner = (props) => {
  const history = useHistory();

  const goToPage = () => {
    history.push(props.path);
  };

  return (
    <div onClick={goToPage} className="registration-navcorner">
      {props.name}
    </div>
  );
};

export { SignNavCorner };
