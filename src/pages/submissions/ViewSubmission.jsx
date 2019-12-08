import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import PageTitle from "../../components/helper/PageTitle";
import Loader from "../../components/helper/Loader";
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

const ViewSubmission = ({ match }) => {
  const submissionId = match.params.id;
  const [submission, loading] = useSubmission(submissionId);

  const { scriptTitle, scriptFile } = submission;
  return (
    <div className="ui form container">
      <PageTitle title={scriptTitle} icon="film" />
      {loading && <Loader text="Loading" />}
      <div className="ui segment">
        <a
          href={scriptFile}
          target="_blank"
          rel="noopener noreferrer"
          download={scriptTitle}
        >
          Download Submission
        </a>
      </div>
    </div>
  );
};

export default ViewSubmission;
