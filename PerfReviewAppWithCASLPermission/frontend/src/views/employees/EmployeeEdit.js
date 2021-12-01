/**
 * React Functional Component : "EmployeeEdit"
 * Purpose : Renders employee info edit form
 * State Manager : EmployeeReducer
 */

import React, { useEffect, useState } from "react";
import {
  CSpinner,
  CInput,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CButton,
  CSelect,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { renderEmployeeOptions } from "src/views/employees/common";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeInfo, updateEmployeeInfo } from "src/redux/actions";

const Employee = ({ match }) => {
  let empData = useSelector((state) => state.EmployeeReducer.empData);
  let waitForServer = useSelector(
    (state) => state.EmployeeReducer.waitForServer
  );
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeInfo({ id: match.params.id }));
  }, [dispatch]);

  useEffect(() => {
    if (empData && empData && empData["name"]) {
      setName(empData["name"]);
    }

    if (empData && empData && empData["email"]) {
      setEmail(empData["email"]);
    }
    if (empData && empData && empData["role"]) {
      setRole(empData["role"]);
    }
  }, [empData]);

  let saveEmployeeInfo = () => {
    if (waitForServer !== true) {
      dispatch(
        updateEmployeeInfo({
          emp_id: match.params.id,
          name: name,
          email: email,
          role: role,
        })
      );
    }
  };

  return (
    <div className="c-default-layout flex-row align-items-center">
      <CRow className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm>
                <h1>Update Employee Info</h1>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-envelope-closed" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CSelect
                    type="text"
                    placeholder="Role"
                    autoComplete="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {renderEmployeeOptions()}
                  </CSelect>
                </CInputGroup>
                <CButton
                  color={waitForServer ? "secondary" : "primary"}
                  block
                  onClick={saveEmployeeInfo}
                >
                  Update{" "}
                  <CSpinner
                    hidden={waitForServer !== true}
                    color="success"
                    size="sm"
                  ></CSpinner>
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Employee;
