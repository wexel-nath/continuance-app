import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import { Pagination } from "../../components/helper/Pagination";
import PageTitle from "../../components/helper/PageTitle";
import UploadContactsForm from "../../components/contacts/UploadContactsForm";
import MigrationTable from "../../components/contacts/MigrationTable";
import { getMigrationList } from "../../api/continuance";

const useGetMigrations = () => {
  const [migrations, setMigrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getMigrations = async () => {
    const response = await getMigrationList(currentPage);
    const {
      data: { data, meta }
    } = toCamelCase(response);
    setMigrations(data || []);
    setTotalPages(meta.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    getMigrations();
  }, [currentPage]);

  return [migrations, loading, totalPages, currentPage, setCurrentPage];
};

const UploadContacts = () => {
  const [
    migrations,
    loading,
    totalPages,
    currentPage,
    setCurrentPage
  ] = useGetMigrations();

  return (
    <div className="ui container">
      <PageTitle title="Upload Contacts" icon="cloud upload" />
      <UploadContactsForm />
      <MigrationTable migrations={migrations} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default UploadContacts;
