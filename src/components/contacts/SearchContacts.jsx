import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { handleSearchContacts } from "../../actions";

class SearchContacts extends React.Component {
  renderSearchInput() {
    return (
      <div className="ui fluid search">
        <div className="ui fluid icon input">
          <input
            className="prompt"
            type="text"
            onChange={({ target }) => {
              this.props.handleSearchContacts(target.value);
            }}
            placeholder="Search by name, email, or company..."
          />
          <i className="search icon" />
        </div>
        <div className="results" />
      </div>
    );
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
          Search Contacts
        </h2>
        {this.renderSearchInput()}
        {contactsSegment}
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => {
  return { contacts: search };
};

export default connect(
  mapStateToProps,
  { handleSearchContacts }
)(SearchContacts);
