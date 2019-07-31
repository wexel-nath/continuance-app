import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import PageTitle from "../components/helper/PageTitle";
import { getRecentNotes } from "../api/continuance";
import NoteTable from "../components/note/NoteTable";
import { Pagination } from "../components/helper/Pagination";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getNotes = async () => {
    setLoading(true);
    const {
      data: { data, meta }
    } = await getRecentNotes(currentPage);
    setLoading(false);
    setTotalPages(meta.totalPages || 1);
    setNotes(toCamelCase(data));
  };

  useEffect(() => {
    getNotes();
  }, [currentPage]);

  return [notes, loading, totalPages, currentPage, setCurrentPage];
};

const LandingPage = () => {
  const [notes, loading, totalPages, currentPage, setCurrentPage] = useNotes();

  return (
    <div className="ui container">
      <PageTitle title="Recent Events" icon="calendar alternate outline" />
      <NoteTable includeContact notes={notes} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default LandingPage;
