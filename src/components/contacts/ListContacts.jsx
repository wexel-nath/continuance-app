import React from "react";
import { camelizeKeys as toCamelCase } from "humps";

import ContactTable from "./ContactTable";
import { getContactList } from "../../api/continuance";

class ListContacts extends React.Component {
  state = {
    contacts: [],
    limit: 20,
    offset: 0
  };

  async componentDidMount() {
    const { limit, offset } = this.state;

    let contacts = [];
    const {
      data: { data }
    } = await getContactList(limit, offset);

    if (data) {
      contacts = toCamelCase(data);
    }

    this.setState({ contacts });
  }

  render() {
    const { contacts } = this.state;
    return (
      <div className="ui container">
        <h2 className="ui header">
          <i className="address card outline icon blue" />
          View Contacts
        </h2>
        <ContactTable contacts={contacts} />
      </div>
    );
  }
}

export default ListContacts;
