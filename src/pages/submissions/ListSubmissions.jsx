import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";

import SubmissionTable from "../../components/submissions/SubmissionTable";
import { Pagination } from "../../components/helper/Pagination";
import { getSubmissionList } from "../../api/continuance";

const useGetSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getSubmissions = async () => {
    const response = await getSubmissionList(currentPage);
    const {
      data: { data, meta }
    } = toCamelCase(response);
    setSubmissions(data || []);
    setTotalPages(meta.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    getSubmissions();
  }, [currentPage]);

  return [submissions, loading, totalPages, currentPage, setCurrentPage];
};

const ListSubmissions = () => {
  const [
    submissions,
    loading,
    totalPages,
    currentPage,
    setCurrentPage
  ] = useGetSubmissions();

  return (
    <Container maxWidth="lg">
      <SubmissionTable submissions={submissions} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </Container>
  );
};

export default ListSubmissions;
