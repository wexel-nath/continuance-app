import React from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Loader from "../helper/Loader";

const SubmissionRow = ({ submission }) => {
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
  return (
    <TableRow>
      <TableCell>
        <Link className="header" to={`/submissions/${submissionId}`}>
          {scriptTitle}
        </Link>
      </TableCell>
      <TableCell>
        <Link className="header" to={`/contacts/${contactId}`}>
          {firstName + " " + lastName}
        </Link>
      </TableCell>
      <TableCell>{submissionCreated || ""}</TableCell>
      <TableCell>{reviewCreatedBy || ""}</TableCell>
      <TableCell>{reviewCreated || ""}</TableCell>
      <TableCell>{reviewScore >= 0 ? reviewScore : ""}</TableCell>
    </TableRow>
  );
};

const SubmissionTable = ({ submissions, loading }) => {
  return (
    <TableContainer component={Paper}>
      {loading && <Loader text="Loading" />}
      <Table size="small">
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
          {submissions.map(submission => {
            return (
              <SubmissionRow
                submission={submission}
                key={submission.submissionId}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubmissionTable;
