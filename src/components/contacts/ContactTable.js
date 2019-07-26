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

const Loader = () => {
  return (
    <div className="ui active inverted dimmer">
      <div className="ui text loader">Loading</div>
    </div>
  );
};

const ContactTable = ({ contacts, loading }) => {
  return (
    <div>
      {loading && <Loader />}
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
    </div>
  );
};

export default ContactTable;
