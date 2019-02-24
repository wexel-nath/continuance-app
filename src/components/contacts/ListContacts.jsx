import React from "react";
import { connect } from "react-redux";

class ListContacts extends React.Component {
  renderContactRows(contacts) {
    let contactsArray = [];
    for (const key in contacts) {
      // handle re-sorting?
      contactsArray.push(contacts[key]);
    }
    return contactsArray.map(
      (
        { firstName, lastName, phone, email, location, position, company },
        index
      ) => {
        return (
          <tr key={index}>
            <td>{firstName + " " + lastName}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{location}</td>
            <td>{position}</td>
            <td>{company}</td>
          </tr>
        );
      }
    );
  }

  render() {
    const { contacts } = this.props;
    if (Object.keys(contacts).length === 0) {
      return <div>ListContacts</div>;
    }
    return (
      <div>
        <table className="ui fixed single line celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Email Address</th>
              <th>Based In</th>
              <th>Position</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>{this.renderContactRows(contacts)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => {
  return { contacts };
};

export default connect(mapStateToProps)(ListContacts);
