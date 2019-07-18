import React from "react";
import { Field, reduxForm } from "redux-form";

import {
  renderTextInput,
  renderTextAreaInput,
  renderLocationInput
} from "../helper/formHelpers";

const ContactDetails = () => {
  return (
    <div className="ui segment">
      <h3 className="ui header">Contact Details</h3>
      <div className="two fields">
        <Field
          label="First Name"
          name="firstName"
          component={renderTextInput}
          placeholder="Thomas"
        />
        <Field
          label="Last Name"
          name="lastName"
          component={renderTextInput}
          placeholder="Alter"
        />
      </div>
      <div className="two fields">
        <Field
          label="Contact Number"
          name="phone"
          component={renderTextInput}
          placeholder="0412 345 678"
        />
        <Field
          label="Email Address"
          name="email"
          component={renderTextInput}
          placeholder="thomas@example.com"
        />
      </div>
      <div className="two fields">
        <Field
          label="Based In"
          name="locationBased"
          component={renderLocationInput}
        />
        <Field
          label="Location Met"
          name="locationMet"
          component={renderLocationInput}
        />
      </div>
      <Field
        label="Notes"
        name="notes"
        component={renderTextAreaInput}
        placeholder="Optional notes"
        rows="2"
      />
    </div>
  );
};

export default reduxForm()(ContactDetails);
