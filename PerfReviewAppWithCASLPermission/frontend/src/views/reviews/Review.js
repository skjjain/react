/**
 * React Functional Component : "Review"
 * Purpose : Renders view of a review
 * State Manager : ReviewReducer
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
import { getReviewInfo } from "src/redux/actions";
import { useHistory } from "react-router-dom";
import { reviewFields } from "src/data/masters";

const Review = ({ match }) => {
  const history = useHistory();
  const reviewData = useSelector((state) => state.ReviewReducer.reviewData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewInfo({ id: match.params.id }));
  }, [dispatch]);

  const revFields = Object.keys(reviewFields);

  function renderField(data, field, masters) {
    console.log(masters);
    switch (masters[field].type) {
      case "employee": {
        return (
          <tr key={field}>
            <td>{masters[field]["label"]}</td>
            <td>
              {data[field]} ({data[masters[field]["id"]]})
            </td>
          </tr>
        );
      }
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
            <td>{selected && selected[0] && selected[0].v}</td>
          </tr>
        );
      }
    }
  }

  function renderReview(review) {
    if (!review) return null;
    return <>{revFields.map((f) => renderField(review, f, reviewFields))}</>;
  }

  const editReview = (reviewId) => {
    reviewId && history.push(`/review/${reviewId}/edit`);
  };

  return (
    <div className="c-default-layout flex-row align-items-center">
      <CRow className="justify-content-center">
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              Review id: {match.params.id}
              {reviewData && reviewData["status"] == 1 && (
                <CButton
                  onClick={() => editReview(match.params.id)}
                  className="btn float-right btn-primary btn-sm"
                >
                  Edit
                </CButton>
              )}
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>{renderReview(reviewData)}</tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Review;
