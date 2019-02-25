import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  renderDisabledInput,
  renderDisabledTextArea
} from "../helper/formHelpers";

class ViewContact extends React.Component {
  render() {
    if (!this.props.contact) {
      return <Redirect to="/contacts" />;
    }
    const {
      firstName,
      lastName,
      phone,
      email,
      location,
      location_met,
      position,
      company,
      notes
    } = this.props.contact;
    return (
      <div className="ui form container">
        <div className="ui segment">
          <h2 className="ui header">{firstName + " " + lastName}</h2>
          <div className="two fields">
            {renderDisabledInput("First Name", firstName)}
            {renderDisabledInput("Last Name", lastName)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Contact Number", phone)}
            {renderDisabledInput("Email Address", email)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Based In", location)}
            {renderDisabledInput("Location Met", location_met)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Position", position)}
            {renderDisabledInput("Company", company)}
          </div>
          {renderDisabledTextArea("Notes", notes)}
        </div>
      </div>
    );
  }
}

const mapStateToParams = ({ contacts }, ownProps) => {
  return {
    contact: contacts[ownProps.match.params.id]
  };
};

export default connect(mapStateToParams)(ViewContact);
