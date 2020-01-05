import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Loader from "../../components/helper/Loader";
import SubmissionCard from "../../components/submissions/SubmissionCard";
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

  return (
    <div className="ui form container">
      {loading && <Loader text="Loading" />}
      <SubmissionCard submission={submission} />
    </div>
  );
};

export default ViewSubmission;
