import React from "react";
import { Link } from "react-router-dom";

import Loader from "../helper/Loader";

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

const ContactTable = ({ contacts, loading }) => {
  return (
    <div>
      {loading && <Loader text="Loading" />}
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
