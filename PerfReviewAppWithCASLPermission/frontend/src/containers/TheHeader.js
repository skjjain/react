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
import { Can } from "../casl/can";

// routes config
import routes from "../routes";
import { userLogout } from "src/redux/actions";

const Test = (props) => {
  useEffect(() => {
    console.log("This should not be called for blocked components", props);
  }, []);
  return props.children;
};

const TheHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.EmployeeReducer.loginStatus);

  const AuthReducer = useSelector((state) => state.AuthReducer);

  // rerender the component when `auth` changes
  useState(() => {}, [AuthReducer]);

  useEffect(() => {
    if (loginStatus && loginStatus.success) {
      if (loginStatus.role == 2 && location.pathname.startsWith("/employee")) {
        //history.push("/reviews");
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
        <Can I="view" A="employees">
          <Test action="view" subject="employees">
            <CHeaderNavItem className="px-3">
              <CHeaderNavLink to="/employees">Employees</CHeaderNavLink>
            </CHeaderNavItem>
          </Test>
        </Can>
        <Can I="view" A="reviews">
          <Test action="view" subject="reviews">
            <CHeaderNavItem className="px-3">
              <CHeaderNavLink to="/reviews">Reviews</CHeaderNavLink>
            </CHeaderNavItem>
          </Test>
        </Can>
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
