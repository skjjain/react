/**
 * React Functional Component : "Employee"
 * Purpose : Renders view of employee info
 * State Manager : EmployeeReducer
 */

import React, { useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeInfo } from "src/redux/actions";
import { useHistory } from "react-router-dom";
import { employeeFields } from "src/data/masters";

const Employee = ({ match }) => {
  const history = useHistory();
  const empData = useSelector((state) => state.EmployeeReducer.empData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeInfo({ id: match.params.id }));
  }, [dispatch]);

  const empFields = Object.keys(employeeFields);

  function renderField(data, field, masters) {
    switch (masters[field].type) {
      case "text": {
        return (
          <tr key={field}>
            <td>{masters[field]["label"]}</td>
            <td>{data[field]}</td>
          </tr>
        );
      }
      case "select": {
        let selected = masters[field]["values"].filter(
          (d) => d.k == data[field]
        );
        return (
          <tr key={field}>
            <td>{masters[field]["label"]}</td>
            <td>{selected && selected[0].v}</td>
          </tr>
        );
      }
    }
  }

  function renderEmployee(emp) {
    if (!emp) return null;
    return <>{empFields.map((f) => renderField(emp, f, employeeFields))}</>;
  }

  const editEmployee = (empId) => {
    empId && history.push(`/employee/${empId}/edit`);
  };

  return (
    <div className="c-default-layout flex-row align-items-center">
      <CRow className="justify-content-center">
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              Employee id: {match.params.id}
              <CButton
                onClick={() => editEmployee(match.params.id)}
                className="btn float-right btn-primary btn-sm"
              >
                Edit
              </CButton>
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>{renderEmployee(empData)}</tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Employee;
