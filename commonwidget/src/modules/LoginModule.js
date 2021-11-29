import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import "./LoginModule.scss";
const LoginLayoutBasic = React.lazy(() =>
  import("../layouts/LoginLayoutBasic")
);

export default function LoginModule() {
  const moduleOptions = useSelector(
    (state) => state.CommonReducer.moduleOptions
  );
  function renderLayout() {
    switch (moduleOptions.layout) {
      case "tabs":
        return (
          <div className="tabLayout">
            <LoginLayoutBasic></LoginLayoutBasic>
          </div>
        );
      default:
        return (
          <div className="tabLayout">
            <LoginLayoutBasic></LoginLayoutBasic>
          </div>
        );
    }
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{renderLayout()}</Suspense>
    </div>
  );
}
