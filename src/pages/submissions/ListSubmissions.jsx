import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";

import SubmissionTable from "../../components/submissions/SubmissionTable";
import { Pagination } from "../../components/helper/Pagination";
import { getSubmissionsByYear } from "../../api/continuance";
import Loader from "../../components/helper/Loader";

const useGetSubmissions = year => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getSubmissions = async () => {
    setLoading(true);
    const response = await getSubmissionsByYear(year, currentPage);
    const {
      data: { data, meta }
    } = toCamelCase(response);
    setSubmissions(data || []);
    setTotalPages(meta.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    getSubmissions();
  }, [year, currentPage]);

  return [submissions, loading, totalPages, currentPage, setCurrentPage];
};

const ListSubmissions = ({ match }) => {
  const year = match.params.year;
  const [
    submissions,
    loading,
    totalPages,
    currentPage,
    setCurrentPage
  ] = useGetSubmissions(year);

  return (
    <Container maxWidth="lg">
      {loading && <Loader text="Loading" />}
      <SubmissionTable year={year} submissions={submissions} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </Container>
  );
};

export default ListSubmissions;
