import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

const darkMode = window.localStorage.getItem("dark");
if (!darkMode) {
  console.log("not set theme yet");
} else {
  if (darkMode?.length === 4) {
    var element = document.getElementById("root");
    element.classList.add("theme-dark");
  }
}
