import App from "./App";

import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

window.initCommonWidget = function (
  moduleName,
  divId = "app-root",
  options = {}
) {
  ReactDom.render(
    <Provider store={store}>
      <App moduleName={moduleName} moduleOptions={options}></App>
    </Provider>,
    document.getElementById(divId)
  );
};
// window.initCommonWidget();
