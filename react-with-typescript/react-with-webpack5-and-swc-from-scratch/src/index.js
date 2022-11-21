import React from "react";
import ReactDom from "react-dom";
function component() {
  const element = document.createElement("div");
  element.id = "app-root";
  return element;
}
document.body.appendChild(component());
// document.getElementById("app-root").innerHTML = "Hello World!!!";
ReactDom.hydrate(
  <div>Hello World!!!</div>,
  document.getElementById("app-root")
);
