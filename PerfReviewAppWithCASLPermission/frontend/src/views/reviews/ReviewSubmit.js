/**
 * React Functional Component : "ReviewSubmit"
 * Purpose : Renders form to submit a review
 * State Manager : ReviewReducer
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
  CTextarea,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { renderEmployees, renderRatings } from "src/views/reviews/common";

import { useSelector, useDispatch } from "react-redux";
import {
  submitReview,
  getEmployeeListing,
  getReviewInfo,
  unsetLastAddedReviewId,
} from "src/redux/actions";

const ReviewSubmit = ({ match }) => {
  const history = useHistory();
  let waitForServer = useSelector((state) => state.ReviewReducer.waitForServer);
  let [employees, setEmployees] = useState([]);
  let [from, setFrom] = useState(0);
  let [to, setTo] = useState(0);
  let [year, setYear] = useState(2021);
  let [quarter, setQuarter] = useState(3);
  let [remarks, setRemarks] = useState("");
  let [rating, setRating] = useState("");

  useEffect(() => {
    dispatch(getEmployeeListing({}));
    dispatch(getReviewInfo({ id: match.params.id }));
  }, [dispatch]);

  const reviewData = useSelector((state) => state.ReviewReducer.reviewData);

  const empListingData = useSelector(
    (state) => state.EmployeeReducer.empListingData
  );

  useEffect(() => {
    if (reviewData) {
      setFrom(reviewData["from_emp"]);
      setTo(reviewData["to_emp"]);
      setYear(reviewData["year"]);
      setQuarter(reviewData["quarter"]);
      setRating(reviewData["rating"]);
      setRemarks(reviewData["remarks"]);
    }
  }, [reviewData]);

  useEffect(() => {
    if (empListingData) {
      setEmployees(empListingData);
    }
  }, [empListingData]);

  let lastAddedReviewId = useSelector(
    (state) => state.ReviewReducer.lastAddedReviewId
  );

  const dispatch = useDispatch();

  let saveReview = () => {
    if (waitForServer !== true && remarks && rating) {
      dispatch(
        submitReview({
          review_id: match.params.id,
          remarks: remarks,
          rating: rating,
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(unsetLastAddedReviewId());
    };
  }, [1]);

  useEffect(() => {
    if (lastAddedReviewId > 0) {
      history.push("/review/" + lastAddedReviewId);
    }
  }, [lastAddedReviewId]);

  return (
    <div className="c-default-layout flex-row align-items-center">
      <CRow className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm>
                <h1>Submit Review Feedback</h1>

                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      From
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CSelect
                    type="text"
                    placeholder="From"
                    autoComplete="from"
                    readOnly={true}
                    value={from}
                  >
                    <option>Select reviewer</option>
                    {renderEmployees(employees)}
                  </CSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      To
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CSelect
                    type="text"
                    placeholder="To"
                    autoComplete="to"
                    readOnly={true}
                    value={to}
                  >
                    <option>Select reviewee</option>
                    {renderEmployees(employees)}
                  </CSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      Year
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    placeholder="Year"
                    autoComplete="year"
                    readOnly={true}
                    value={year}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      Quarter
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="text"
                    placeholder="Quarter"
                    autoComplete="quarter"
                    readOnly={true}
                    value={quarter}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      Rating
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CSelect
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option>Select rating</option>
                    {renderRatings()}
                  </CSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText style={{ minWidth: "75px" }}>
                      Remarks
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CTextarea
                    type="text"
                    placeholder="Write your feedback here"
                    autoComplete="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </CInputGroup>
                {reviewData && reviewData["status"] == 1 && (
                  <CButton
                    color={
                      waitForServer || !rating || !remarks
                        ? "secondary"
                        : "primary"
                    }
                    block
                    onClick={saveReview}
                  >
                    Submit{" "}
                    <CSpinner
                      hidden={waitForServer !== true}
                      color="success"
                      size="sm"
                    ></CSpinner>
                  </CButton>
                )}
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default ReviewSubmit;
