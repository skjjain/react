import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  CHeader,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CButton,
} from "@coreui/react";
import CAN from "../casl/can";

// routes config
import routes from "../routes";
import { userLogout } from "src/redux/actions";

const TheHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.EmployeeReducer.loginStatus);

  const AuthReducer = useSelector((state) => state.AuthReducer);

  // rerender the component when `auth` changes
  useState(() => {}, [AuthReducer]);

  useEffect(() => {
    console.log(31, loginStatus);
    if (loginStatus && loginStatus.success) {
      if (loginStatus.role == 2 && location.pathname.startsWith("/employee")) {
        history.push("/reviews");
      }
    } else {
      history.push("/login");
    }
  }, [loginStatus, location]);

  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <CHeader withSubheader style={{ justifyContent: "flex-end" }}>
      <CHeaderNav className="mr-auto">
        {CAN("view", "employees") && (
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/employees">Employees</CHeaderNavLink>
          </CHeaderNavItem>
        )}
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/reviews">Reviews</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CButton color="success" variant="outline" onClick={logout}>
          Logout
        </CButton>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <span
          style={{ display: "flex", alignItems: "center", fontSize: "smaller" }}
        >
          Logged in as : {loginStatus && loginStatus.name}
        </span>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
