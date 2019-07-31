import React from "react";

import { Input, LocationInput, TextAreaInput } from "../helper/formHelpers";

const ContactDetails = ({ formValues }) => {
  return (
    <div className="ui segment">
      <h3 className="ui header">Contact Details</h3>
      <div className="two fields">
        <Input
          label="First Name"
          name="firstName"
          placeholder="Thomas"
          type="text"
          formValues={formValues}
        />
        <Input
          label="Last Name"
          name="lastName"
          placeholder="Alter"
          type="text"
          formValues={formValues}
        />
      </div>
      <div className="two fields">
        <Input
          label="Contact Number"
          name="contactPhone"
          placeholder="0412 345 678"
          type="text"
          formValues={formValues}
        />
        <Input
          label="Email Address"
          name="contactEmail"
          placeholder="thomas@example.com"
          type="text"
          formValues={formValues}
        />
      </div>
      <div className="two fields">
        <LocationInput
          label="Based In"
          name="locationBased"
          formValues={formValues}
        />
        <LocationInput
          label="Location Met"
          name="locationMet"
          formValues={formValues}
        />
      </div>
      <TextAreaInput
        label="Notes"
        name="contactNote"
        placeholder="Optional notes"
        rows="2"
        formValues={formValues}
      />
    </div>
  );
};

export default ContactDetails;
