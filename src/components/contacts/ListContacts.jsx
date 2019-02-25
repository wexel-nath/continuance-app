import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ListContacts extends React.Component {
  renderContactItems(contacts) {
    let contactsArray = [];
    for (const key in contacts) {
      // handle re-sorting?
      contactsArray.push(contacts[key]);
    }
    return contactsArray.map(
      ({ firstName, lastName, email, location, position, company }, index) => {
        return (
          <div className="item" key={index}>
            <div className="content">
              <Link className="header" to={`/contacts/${email}`}>
                {firstName + " " + lastName}
              </Link>
              <div className="meta">
                {location && <div className="ui label">{location}</div>}
                {position && <div className="ui label">{position}</div>}
                {company && <div className="ui label">{company}</div>}
              </div>
            </div>
          </div>
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
      <div className="ui container">
        <h2 className="ui header">
          <i className="address card outline icon blue" />
          View Contacts
        </h2>
        <div className="ui segment">
          <div className="ui divided items">
            {this.renderContactItems(contacts)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => {
  return { contacts };
};

export default connect(mapStateToProps)(ListContacts);
