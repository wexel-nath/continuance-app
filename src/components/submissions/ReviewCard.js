import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ReviewForm from "./ReviewForm";
import { SubmissionCardHeader } from "./SubmissionCard";

const ReviewCard = ({ submission }) => {
  const data = submission.submissionData || {};
  const { synopsisLine } = data;
  return (
    <Card>
      <SubmissionCardHeader submission={submission} />
      <CardContent>
        <Typography>
          <b>Synopsis:</b> {synopsisLine}
        </Typography>
        <ReviewForm submissionId={submission.submissionId} />
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
