let commonWidgetServer = "";
export default function CommonWidget(elementId, moduleName) {
  window.commonWidgetServer = commonWidgetServer;
  this.eventListener = function () {};
  this.setEventListener = function (eventListener) {
    this.eventListener = eventListener;
  };
  this.loginOptions = [];
  this.setLoginOptions = function (loginOptions) {
    this.loginOptions = loginOptions;
  };
  this.layout = "basic";
  this.setLayout = function (layout) {
    this.layout = layout;
  };
  this.init = function () {
    const options = {
      eventListener: this.eventListener,
      loginOptions: this.loginOptions,
      layout: this.layout,
    };
    let addScript = function (scriptPath, callback) {
      const script = document.createElement("script");
      script.setAttribute("id", "script-id");
      const position = document.querySelector("body");
      position.appendChild(script);
      script.onload = callback;
      script.src = scriptPath;
    };
    addScript(window.commonWidgetServer + "integration/index.js", function () {
      window["LoadCommonWidget"](moduleName, elementId, options);
    });
  };
}
