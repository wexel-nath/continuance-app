import React from "react";
import { Link } from "react-router-dom";

import "./ContactTable.css";

const ContactRow = ({ contact }) => {
  const {
    contactId,
    firstName,
    lastName,
    contactEmail,
    locationBased,
    companyPosition,
    companyName
  } = contact;
  return (
    <tr>
      <td>
        <Link className="header" to={`/contacts/${contactId}`}>
          {firstName + " " + lastName}
        </Link>
      </td>
      <td>{contactEmail || ""}</td>
      <td>{locationBased || ""}</td>
      <td>{companyName || ""}</td>
      <td>{companyPosition || ""}</td>
    </tr>
  );
};

class ContactTable extends React.Component {
  state = {
    pagination: {
      currentPage: 1,
      totalPages: 5
    }
  };

  render() {
    const { contacts } = this.props;
    if (contacts.length === 0) {
      return <div>{/* todo: no contacts message */}</div>;
    }
    return (
      <table className="ui striped table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Based In</th>
            <th>Company</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => {
            return <ContactRow contact={contact} key={contact.contactId} />;
          })}
        </tbody>
      </table>
    );
  }
}

export default ContactTable;
