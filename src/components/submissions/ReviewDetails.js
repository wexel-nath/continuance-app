import React from "react";

import Rating from "@material-ui/lab/Rating";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FeedbackIcon from "@material-ui/icons/Feedback";

import { SubmissionCardHeader } from "./SubmissionCard";
import ReviewItem from "./ReviewItem";
import { criteria } from "./reviewCriteria";

const Comments = ({ comments }) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      style={{ marginTop: "10px" }}
    >
      <Grid item>
        <FeedbackIcon color="primary" fontSize="large" />
      </Grid>
      <Grid item style={{ marginLeft: "10px", fontStyle: "italic" }}>
        {comments}
      </Grid>
    </Grid>
  );
};

const Subtitle = ({ name, value }) => {
  return (
    <Typography>
      <b>{name}:</b> {value}
    </Typography>
  );
};

const ReviewDetails = ({ submission, review }) => {
  const data = submission.submissionData || {};
  const {
    submissionReviewCreated,
    submissionReviewCreatedBy,
    submissionReviewData,
    submissionReviewScore
  } = review;

  const { synopsisLine } = data;
  return (
    <Card>
      <SubmissionCardHeader submission={submission} />
      <CardContent>
        <Subtitle name="Synopsis" value={synopsisLine} />
        <Subtitle name="Score" value={submissionReviewScore} />
        <Subtitle
          name="Reviewed By"
          value={`${submissionReviewCreatedBy} on ${submissionReviewCreated}`}
        />
        {criteria.map(criterion => {
          const key = criterion.key;
          const { score, comments } = submissionReviewData
            ? submissionReviewData[key]
            : {};

          return (
            <ReviewItem
              comments={<Comments comments={comments} />}
              rating={<Rating name={key} value={score} disabled />}
              key={criterion.key}
              criterion={criterion}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ReviewDetails;
