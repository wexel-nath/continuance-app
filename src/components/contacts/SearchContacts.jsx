import React from "react";
import { camelizeKeys as toCamelCase } from "humps";

import ContactTable from "./ContactTable";
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

class SearchContacts extends React.Component {
  state = {
    contacts: []
  };

  handleChange = async search => {
    let contacts = [];
    if (search !== "") {
      const {
        data: { data }
      } = await searchContacts(search);

      if (data) {
        contacts = toCamelCase(data);
      }
    }

    this.setState({ contacts });
  };

  render() {
    const { contacts } = this.state;
    return (
      <div className="ui container">
        <h2 className="ui header">
          <i className="address card outline icon blue" />
          Search Contacts
        </h2>
        <SearchInput
          onChange={({ target }) => {
            this.handleChange(target.value);
          }}
        />
        <ContactTable contacts={contacts} />
      </div>
    );
  }
}

export default SearchContacts;
