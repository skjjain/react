/**
 * React Functional Component : "Reviews"
 * Purpose : Renders list of reviews
 * State Manager : ReviewReducer
 */

import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { reviewFields } from "src/data/masters";
import { getReviewListing } from "src/redux/actions";

const Reviews = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [pageCount, setPageCount] = useState(1);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/reviews?page=${newPage}`);
  };

  const loginStatus = useSelector((state) => state.EmployeeReducer.loginStatus);

  useEffect(() => {
    dispatch(getReviewListing({}));
  }, [dispatch]);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const reviewListingData = useSelector(
    (state) => state.ReviewReducer.reviewListingData
  );

  useEffect(() => {
    if (reviewListingData) {
      setReviews(reviewListingData);
      setPageCount(Math.ceil(reviewListingData.length / 5));
    }
  }, [reviewListingData]);

  function renderFieldValues(item) {
    let fieldValues = {};
    fieldValues["From"] = (item) => (
      <td>
        {item.name_from} ({item.from_emp})
      </td>
    );
    fieldValues["To"] = (item) => (
      <td>
        {item.name_to} ({item.to_emp})
      </td>
    );
    fieldValues["Year"] = (item) => <td>{item.year}</td>;
    fieldValues["Quarter"] = (item) => <td>{item.quarter}</td>;
    // fieldValues["Ratings"] = (item) => (
    //   <td>
    //     {reviewFields["ratings"].values.filter((f) => f.k == item.rating)[0].v}
    //   </td>
    // );
    fieldValues["Status"] = (item) => (
      <td>
        {reviewFields["status"].values.filter((f) => f.k == item.status)[0].v}
      </td>
    );
    return fieldValues;
  }

  function renderHeader() {
    if (loginStatus && loginStatus.role != 2) {
      return (
        <CCardHeader>
          Reviews
          <CButton
            onClick={() => {
              history.push("/review/add");
            }}
            className="btn float-right btn-primary btn-sm"
          >
            Add
          </CButton>
        </CCardHeader>
      );
    } else {
      return <CCardHeader>Assigned Reviews</CCardHeader>;
    }
  }

  function clickReview(item) {
    if (loginStatus && loginStatus.role != 2) {
      history.push(`/review/${item.review_id}`);
    } else if (item && item.status == 2) {
      history.push(`/review/${item.review_id}`);
    } else {
      history.push(`/review/${item.review_id}/submit`);
    }
  }

  return (
    <div className="c-default-layout flex-row align-items-center">
      <CRow className="justify-content-center">
        <CCol xl={6}>
          <CCard>
            {renderHeader()}
            <CCardBody>
              <CDataTable
                items={reviews}
                fields={[
                  { key: "review_id", _classes: "font-weight-bold" },
                  "From",
                  "To",
                  "Year",
                  "Quarter",
                  "Status",
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={page}
                clickableRows
                onRowClick={clickReview}
                scopedSlots={renderFieldValues()}
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

export default Reviews;
