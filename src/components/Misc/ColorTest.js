import React from "react";
import { colorNames } from "../../constants";
import "./colortest.scss";

const ColorTest = () => {
  const colors = colorNames.map((colorName) => {
    return (
      <div className={"colortest-block convo-bg-" + colorName} key={colorName}>
        {colorName}
        <br></br>
        This text should be completely legible
      </div>
    );
  });

  return <div className="colortest-screen">{colors}</div>;
};

export { ColorTest };
