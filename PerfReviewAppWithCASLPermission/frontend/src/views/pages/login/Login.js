import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CSelect,
  CInputGroup,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { renderUsers } from "src/views/pages/login/common";
import { useSelector, useDispatch } from "react-redux";
import { getUserListing, userLogin, checkLogin } from "src/redux/actions";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let [isLogin, setIsLogin] = useState(false);
  let [user, setUser] = useState(false);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(checkLogin({}));
    dispatch(getUserListing({}));
  }, [dispatch]);

  const userListingData = useSelector(
    (state) => state.EmployeeReducer.userListingData
  );

  const loginStatus = useSelector((state) => state.EmployeeReducer.loginStatus);

  useEffect(() => {
    if (loginStatus && loginStatus.success) {
      setIsLogin(true);
    }
  }, [loginStatus]);

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin]);

  useEffect(() => {
    if (userListingData) {
      setUsers(userListingData);
    }
  }, [userListingData]);

  const doLogin = () => {
    dispatch(userLogin({ username: user, password: user }));
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CSelect
                        placeholder="User"
                        autoComplete="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                      >
                        <option>Select User</option>
                        {renderUsers(users)}
                      </CSelect>
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                        <CButton
                          onClick={doLogin}
                          color={user > 0 ? "primary" : "secondary"}
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
