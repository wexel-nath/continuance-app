import React from "react";
import { Link } from "react-router-dom";

import Loader from "../helper/Loader";

const SubmissionRow = ({ submission }) => {
  const {
    scriptTitle,
    submissionId,
    contactId,
    firstName,
    lastName,
    submissionCreated,
    reviewedBy,
    reviewedOn,
    originality,
    viability,
    socialTrend,
    structure,
    characters,
    stakes,
    dialog,
    cost,
    score
  } = submission;
  return (
    <tr>
      <td>
        <Link className="header" to={`/submissions/${submissionId}`}>
          {scriptTitle}
        </Link>
      </td>
      <td>
        <Link className="header" to={`/contacts/${contactId}`}>
          {firstName + " " + lastName}
        </Link>
      </td>
      <td>{submissionCreated || ""}</td>
      <td>{reviewedBy || ""}</td>
      <td>{reviewedOn || ""}</td>
      <td>{originality || ""}</td>
      <td>{viability || ""}</td>
      <td>{socialTrend || ""}</td>
      <td>{structure || ""}</td>
      <td>{characters || ""}</td>
      <td>{stakes || ""}</td>
      <td>{dialog || ""}</td>
      <td>{cost || ""}</td>
      <td>{score || ""}</td>
    </tr>
  );
};

const SubmissionTable = ({ submissions, loading }) => {
  return (
    <div>
      {loading && <Loader text="Loading" />}
      <table className="ui striped table">
        <thead>
          <tr>
            <th>Script</th>
            <th>Uploader</th>
            <th>Submitted</th>
            <th>Reviewed By</th>
            <th>Reviewed On</th>
            <th>Originality</th>
            <th>Viability</th>
            <th>Social Trend</th>
            <th>Structure</th>
            <th>Characters</th>
            <th>Stakes</th>
            <th>Dialog</th>
            <th>Cost</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => {
            return (
              <SubmissionRow
                submission={submission}
                key={submission.submissionId}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
