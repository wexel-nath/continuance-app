import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import ContactTable from "../../components/contacts/ContactTable";
import { Pagination } from "../../components/helper/Pagination";
import { getContactList } from "../../api/continuance";

const useGetContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getContacts = async () => {
    const response = await getContactList(currentPage);
    const {
      data: { data, meta }
    } = toCamelCase(response);
    setContacts(data || []);
    setTotalPages(meta.totalPages || 1);
    setLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, [currentPage]);

  return [contacts, loading, totalPages, currentPage, setCurrentPage];
};

const ListContacts = () => {
  const [
    contacts,
    loading,
    totalPages,
    currentPage,
    setCurrentPage
  ] = useGetContacts();

  return (
    <div className="ui container">
      <ContactTable contacts={contacts} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default ListContacts;
