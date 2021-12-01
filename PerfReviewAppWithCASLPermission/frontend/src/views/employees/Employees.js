/**
 * React Functional Component : "Employees"
 * Purpose : Renders list of employees
 * State Manager : EmployeeReducer
 */

import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import CIcon from "@coreui/icons-react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";
import { getEmployeeListing, deleteEmployee } from "src/redux/actions";

const Employees = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [pageCount, setPageCount] = useState(1);
  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/employees?page=${newPage}`);
  };

  useEffect(() => {
    dispatch(getEmployeeListing({}));
  }, [dispatch]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const empListingData = useSelector(
    (state) => state.EmployeeReducer.empListingData
  );

  // const EmployeeReducer = useSelector((state) => state.EmployeeReducer);

  // console.log("EmployeeReducer", EmployeeReducer);

  useEffect(() => {
    if (empListingData) {
      setEmployees(empListingData);
      setPageCount(Math.ceil(empListingData.length / 5));
    }
  }, [empListingData]);

  function renderActions(item) {
    return (
      <>
        <CButton
          className="btn btn-secondary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteEmployee({ emp_id: item.emp_id }));
          }}
        >
          <CIcon name="cil-trash"></CIcon>
        </CButton>
      </>
    );
  }

  return (
    <div className="c-default-layout flex-row align-items-center">
      <CRow className="justify-content-center">
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              Employees
              <CButton
                onClick={() => {
                  history.push("/employee/add");
                }}
                className="btn float-right btn-primary btn-sm"
              >
                Add
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={employees}
                fields={[
                  { key: "emp_id", _classes: "font-weight-bold" },
                  "name",
                  "email",
                  "Actions",
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/employee/${item.emp_id}`)}
                scopedSlots={{
                  Actions: (item) => <td>{renderActions(item)}</td>,
                }}
              />
              {pageCount > 1 && (
                <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={pageCount}
                  doubleArrows={false}
                  align="center"
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Employees;
