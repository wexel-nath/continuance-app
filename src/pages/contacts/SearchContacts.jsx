import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import ContactTable from "../../components/contacts/ContactTable";
import { searchContacts } from "../../api/continuance";

const SearchInput = ({ onChange }) => {
  return (
    <div className="ui fluid search">
      <div className="ui fluid icon input">
        <input
          className="prompt"
          type="text"
          onChange={onChange}
          placeholder="Search by name, email, or company..."
        />
        <i className="search icon" />
      </div>
      <div className="results" />
    </div>
  );
};

const useSearchContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [delayFunc, setDelayFunc] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    const {
      data: { data }
    } = await searchContacts(search);
    setContacts(toCamelCase(data || []));
    setLoading(false);
  };

  useEffect(() => {
    if (search !== "") {
      clearTimeout(delayFunc);
      setDelayFunc(setTimeout(handleSearch, 500));
    }
  }, [search]);

  return [contacts, loading, setSearch];
};

const SearchContacts = () => {
  const [contacts, loading, setSearch] = useSearchContacts();

  return (
    <div className="ui container">
      <SearchInput
        onChange={({ target }) => {
          setSearch(target.value);
        }}
      />
      <br />
      <ContactTable contacts={contacts} loading={loading} />
    </div>
  );
};

export default SearchContacts;
