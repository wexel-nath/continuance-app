import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";

import Loader from "../../components/helper/Loader";
import { getSubmissionById, getReviewById } from "../../api/continuance";
import ReviewDetails from "../../components/submissions/ReviewDetails";

const useSubmission = submissionId => {
  const [submission, setSubmission] = useState({});
  const [loading, setLoading] = useState(true);

  const getSubmission = async () => {
    const {
      data: { data }
    } = await getSubmissionById(submissionId);

    setSubmission(toCamelCase(data));
    setLoading(false);
  };

  useEffect(() => {
    getSubmission();
  }, []);

  return [submission, loading];
};

const useReview = (submissionId, reviewId) => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);

  const getReview = async () => {
    const {
      data: { data }
    } = await getReviewById(submissionId, reviewId);

    setReview(toCamelCase(data));
    setLoading(false);
  };

  useEffect(() => {
    getReview();
  }, []);

  return [review, loading];
};

const ViewReview = ({ match }) => {
  const { submissionId, reviewId } = match.params;
  const [submission, submissionLoading] = useSubmission(submissionId);
  const [review, reviewLoading] = useReview(submissionId, reviewId);

  return (
    <Container maxWidth="lg">
      {(submissionLoading || reviewLoading) && <Loader text="Loading" />}
      <ReviewDetails review={review} submission={submission} />
    </Container>
  );
};

export default ViewReview;
