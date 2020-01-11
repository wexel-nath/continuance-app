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
  tableCell: {
    "&:hover": {
      cursor: "pointer",
      fontWeight: "bold"
    }
  }
}));

const ClickableCell = ({ to, value }) => {
  const classes = useStyles();

  return (
    <TableCell className={classes.tableCell} onClick={() => history.push(to)}>
      {value}
    </TableCell>
  );
};

const Row = ({ submission }) => {
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

  const submissionLink = "/submissions/" + submissionId;
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

const SubmissionTable = ({ submissions }) => {
  return (
    <TableContainer component={Paper}>
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
          {submissions.map(submission => (
            <Row submission={submission} key={submission.submissionId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubmissionTable;
