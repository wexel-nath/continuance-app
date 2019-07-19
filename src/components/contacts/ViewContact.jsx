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
      contactPhone,
      contactEmail,
      locationBased,
      locationMet,
      companyPosition,
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
            {renderDisabledInput("Contact Number", contactPhone)}
            {renderDisabledInput("Email Address", contactEmail)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Based In", locationBased)}
            {renderDisabledInput("Location Met", locationMet)}
          </div>
          <div className="two fields">
            {renderDisabledInput("Position", companyPosition)}
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
