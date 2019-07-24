import React from "react";
import { Link } from "react-router-dom";

const tableRow = contact => {
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

const ContactTable = ({ contacts }) => {
  let contactsArray = [];
  for (const key in contacts) {
    // handle re-sorting?
    contactsArray.push(contacts[key]);
  }
  return (
    <table class="ui striped table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Based In</th>
          <th>Company</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>{contactsArray.map(contact => tableRow(contact))}</tbody>
    </table>
  );
};

export default ContactTable;
