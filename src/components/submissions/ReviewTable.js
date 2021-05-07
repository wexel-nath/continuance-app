import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import history from "../../history";

const useStyles = makeStyles(() => ({
  tableRow: {
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

const Row = ({ year, review }) => {
  const classes = useStyles();

  const {
    submissionId,
    submissionReviewId,
    submissionReviewCreatedBy,
    submissionReviewCreated,
    submissionReviewScore,
    submissionReviewData: {
      characters: { score: characters },
      cost: { score: cost },
      dialog: { score: dialog },
      originality: { score: originality },
      socialTrend: { score: socialTrend },
      stakes: { score: stakes },
      structure: { score: structure },
      viability: { score: viability }
    }
  } = review;

  return (
    <TableRow
      className={classes.tableRow}
      hover
      onClick={() =>
        history.push(
          `/short-film/${year}/submissions/${submissionId}/reviews/${submissionReviewId}`
        )
      }
    >
      <TableCell>{submissionReviewCreatedBy || ""}</TableCell>
      <TableCell>{submissionReviewCreated || ""}</TableCell>
      <TableCell>{originality || 0}</TableCell>
      <TableCell>{viability || 0}</TableCell>
      <TableCell>{socialTrend || 0}</TableCell>
      <TableCell>{structure || 0}</TableCell>
      <TableCell>{characters || 0}</TableCell>
      <TableCell>{stakes || 0}</TableCell>
      <TableCell>{dialog || 0}</TableCell>
      <TableCell>{cost || 0}</TableCell>
      <TableCell>{submissionReviewScore || 0}</TableCell>
    </TableRow>
  );
};

const ReviewTable = ({ year, reviews }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Reviewed By</TableCell>
            <TableCell>Reviewed On</TableCell>
            <TableCell>Originality</TableCell>
            <TableCell>Viability</TableCell>
            <TableCell>Social Trend</TableCell>
            <TableCell>Structure</TableCell>
            <TableCell>Characters</TableCell>
            <TableCell>Stakes</TableCell>
            <TableCell>Dialog</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map(review => {
            return <Row year={year} review={review} key={review.submissionReviewId} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewTable;
