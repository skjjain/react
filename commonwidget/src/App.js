import React, { Suspense } from "react";
import "./App.scss";
import { useDispatch } from "react-redux";
import { setModuleOptions } from "./redux/actions";
const LoginModule = React.lazy(() => import("./modules/LoginModule"));
const RegistrationModule = React.lazy(() =>
  import("./modules/RegistrationModule")
);

const DefaultModule = React.lazy(() => import("./modules/DefaultModule"));

export default function App({ moduleName, moduleOptions }) {
  const dispatch = useDispatch();
  dispatch(setModuleOptions({ moduleName, moduleOptions }));
  function renderModule() {
    switch (moduleName) {
      case "LoginModule":
        return <LoginModule></LoginModule>;
      case "RegistrationModule":
        return <RegistrationModule></RegistrationModule>;
      default:
        return <DefaultModule></DefaultModule>;
    }
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{renderModule()}</Suspense>
    </div>
  );
}
