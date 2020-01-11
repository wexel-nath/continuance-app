import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Loader from "../../components/helper/Loader";
import SubmissionCard from "../../components/submissions/SubmissionCard";
import {
  getSubmissionById,
  getReviewsBySubmissionById
} from "../../api/continuance";
import ReviewTable from "../../components/submissions/ReviewTable";

const useSubmission = submissionId => {
  const [reviews, setReviews] = useState([]);
  const [submission, setSubmission] = useState({});
  const [loading, setLoading] = useState(true);

  const getSubmission = async () => {
    const {
      data: { data }
    } = await getSubmissionById(submissionId);

    setSubmission(toCamelCase(data));
    setLoading(false);
  };

  const getReviews = async () => {
    const {
      data: { data }
    } = await getReviewsBySubmissionById(submissionId);

    setReviews(toCamelCase(data));
  };

  useEffect(() => {
    getSubmission();
    getReviews();
  }, []);

  return [submission, reviews, loading];
};

const ViewSubmission = ({ match }) => {
  const submissionId = match.params.id;
  const [submission, reviews, loading] = useSubmission(submissionId);

  return (
    <Container maxWidth="lg">
      {loading && <Loader text="Loading" />}
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <SubmissionCard submission={submission} />
        </Grid>
        <Grid item sm={12}>
          <ReviewTable reviews={reviews} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewSubmission;
