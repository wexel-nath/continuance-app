import React from "react";
import { Field, reduxForm } from "redux-form";

import LocationSearchInput from "./LocationSearchInput";
import validate from "./vaildate";

class ContactDetails extends React.Component {
  renderTextInput({ input, label, placeholder, meta }) {
    const { error, touched } = meta;
    return (
      <div className="field">
        <label>{label}</label>
        <input type="text" {...input} placeholder={placeholder} />
        {error && touched && (
          <div className="ui pointing red basic label">{error}</div>
        )}
      </div>
    );
  }

  renderTextAreaInput({ input, label, placeholder, rows }) {
    return (
      <div className="field">
        <label>{label}</label>
        <textarea {...input} rows={rows} placeholder={placeholder} />
      </div>
    );
  }

  renderLocationInput({ input, name, label }) {
    return (
      <div className="field">
        <label>{label}</label>
        <LocationSearchInput input={input} name={name} />
      </div>
    );
  }

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">Contact Details</h3>
        <div className="two fields">
          <Field
            label="First Name"
            name="firstName"
            component={this.renderTextInput}
            placeholder="Thomas"
          />
          <Field
            label="Last Name"
            name="lastName"
            component={this.renderTextInput}
            placeholder="Alter"
          />
        </div>
        <div className="two fields">
          <Field
            label="Contact Number"
            name="phone"
            component={this.renderTextInput}
            placeholder="0412 345 678"
          />
          <Field
            label="Email Address"
            name="email"
            component={this.renderTextInput}
            placeholder="thomas@example.com"
          />
        </div>
        <div className="two fields">
          <Field
            label="Based In"
            name="location"
            component={this.renderLocationInput}
          />
          <Field
            label="Location Met"
            name="location_met"
            component={this.renderLocationInput}
          />
        </div>
        <Field
          label="Notes"
          name="contactNotes"
          component={this.renderTextAreaInput}
          placeholder="Optional notes"
          rows="2"
        />
      </div>
    );
  }
}

export default reduxForm({
  validate
})(ContactDetails);
