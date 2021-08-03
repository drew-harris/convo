import React from "react";
import "../addgroup.scss";

import { colorNames } from "../../../../../constants";

const ColorPicker = (props) => {
  const colorCircles = colorNames.map((colorName) => {
    if (props.color === colorName) {
      return (
        <div
          className={"colorpicker-active convo-bg-" + colorName}
          onClick={() => props.onChange(colorName)}
          key={colorName}
        ></div>
      );
    } else {
      return (
        <div
          className={"colorpicker-circle convo-bg-" + colorName}
          onClick={() => props.onChange(colorName)}
          key={colorName}
        ></div>
      );
    }
  });

  return <div className="colorpicker-container">{colorCircles}</div>;
};

export { ColorPicker };
