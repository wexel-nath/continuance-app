import React from "react";
import { Link } from "react-router-dom";

import { Pagination } from "../helper/Pagination";

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

const TableFooter = ({ pagination, handlePageChange }) => {
  const { currentPage, totalPages } = pagination;
  return (
    <tfoot>
      <tr>
        <th colSpan="5" className="pagination-wrapper">
          <div className="ui basic center aligned segment">
            <div className="ui pagination menu">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </th>
      </tr>
    </tfoot>
  );
};

class ContactTable extends React.Component {
  state = {
    pagination: {
      currentPage: 1,
      totalPages: 5
    }
  };

  handlePageChange = newPage => {
    console.log(newPage);
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
        <TableFooter
          pagination={this.state.pagination}
          handlePageChange={this.handlePageChange}
        />
      </table>
    );
  }
}

export default ContactTable;
