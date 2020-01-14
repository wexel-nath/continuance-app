import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";

import Loader from "../../components/helper/Loader";
import ReviewCard from "../../components/submissions/ReviewCard";
import { getSubmissionById } from "../../api/continuance";

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

const ReviewSubmission = ({ match }) => {
  const submissionId = match.params.id;
  const [submission, loading] = useSubmission(submissionId);

  return (
    <Container maxWidth="lg">
      {loading && <Loader text="Loading" />}
      <ReviewCard submission={submission} />
    </Container>
  );
};

export default ReviewSubmission;
