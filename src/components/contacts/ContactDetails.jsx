import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { Input, LocationInput } from "../helper/formHelpers";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3)
  }
}));

const ContactDetails = ({ formValues }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h3 className="ui header">Contact Details</h3>
      <Input
        label="First Name"
        name="firstName"
        required
        type="text"
        formValues={formValues}
      />
      <Input
        label="Last Name"
        name="lastName"
        required
        type="text"
        formValues={formValues}
      />
      <Input
        label="Role"
        name="companyPosition"
        required
        type="text"
        formValues={formValues}
      />
      <Input
        label="Contact Number"
        name="contactPhone"
        required
        type="text"
        formValues={formValues}
      />
      <Input
        label="Email Address"
        name="contactEmail"
        required
        type="text"
        formValues={formValues}
      />
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
      <Input
        label="Notes"
        name="contactNote"
        rows="2"
        formValues={formValues}
      />
    </Paper>
  );
};

export default ContactDetails;
