import React from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const ClickableCell = ({ to, value }) => {
  return (
    <TableCell component={Link} to={to}>
      {value}
    </TableCell>
  );
};

const Row = ({ year, submission }) => {
  const {
    scriptTitle,
    submissionId,
    contactId,
    firstName,
    lastName,
    submissionCreated,
    reviewCreatedBy,
    reviewCreated,
    reviewScore
  } = submission;

  const submissionLink = `/short-film/${year}/submissions/${submissionId}`;
  return (
    <TableRow hover>
      <ClickableCell to={submissionLink} value={scriptTitle} />
      <ClickableCell
        to={`/contacts/${contactId}`}
        value={firstName + " " + lastName}
      />
      <ClickableCell to={submissionLink} value={submissionCreated || ""} />
      <ClickableCell to={submissionLink} value={reviewCreatedBy || ""} />
      <ClickableCell to={submissionLink} value={reviewCreated || ""} />
      <ClickableCell
        to={submissionLink}
        value={reviewScore >= 0 ? reviewScore : ""}
      />
    </TableRow>
  );
};

const SubmissionTable = ({ year, submissions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Script</TableCell>
            <TableCell>Uploader</TableCell>
            <TableCell>Submitted</TableCell>
            <TableCell>Reviewed By</TableCell>
            <TableCell>Reviewed On</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map(submission => (
            <Row year={year} submission={submission} key={submission.submissionId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubmissionTable;
