import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { handleGetContactList } from "../../actions";

class ListContacts extends React.Component {
  componentDidMount() {
    this.props.handleGetContactList(20, 0);
  }

  renderContactItems(contacts) {
    let contactsArray = [];
    for (const key in contacts) {
      // handle re-sorting?
      contactsArray.push(contacts[key]);
    }
    return contactsArray.map(
      ({
        contactId,
        firstName,
        lastName,
        contactEmail,
        locationBased,
        companyPosition,
        companyName
      }) => {
        return (
          <div className="item" key={contactId}>
            <div className="content">
              <Link className="header" to={`/contacts/${contactId}`}>
                {firstName + " " + lastName}
              </Link>
              <div className="meta">
                {locationBased && (
                  <div className="ui label">{locationBased}</div>
                )}
                {companyPosition && (
                  <div className="ui label">{companyPosition}</div>
                )}
                {companyName && <div className="ui label">{companyName}</div>}
                {contactEmail && <div className="ui label">{contactEmail}</div>}
              </div>
            </div>
          </div>
        );
      }
    );
  }

  render() {
    const { contacts } = this.props;
    const contactsSegment = Object.keys(contacts).length > 0 && (
      <div className="ui segment">
        <div className="ui divided items">
          {this.renderContactItems(contacts)}
        </div>
      </div>
    );
    return (
      <div className="ui container">
        <h2 className="ui header">
          <i className="address card outline icon blue" />
          View Contacts
        </h2>
        {contactsSegment}
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => {
  return { contacts };
};

export default connect(
  mapStateToProps,
  { handleGetContactList }
)(ListContacts);
