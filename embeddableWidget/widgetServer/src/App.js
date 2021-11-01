import { useState } from "react";
import "./App.scss";
export default function App() {
  const [widgetClass, setWidgetClass] = useState("");

  function onMouseOver(e) {
    setWidgetClass("widget-mouse-over");
  }

  function onMouseOut(e) {
    setWidgetClass("");
  }

  return (
    <div
      id="embeddedWidget"
      className={widgetClass}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <h1>Hello World!!!</h1>This is an embeddable widget
    </div>
  );
}
