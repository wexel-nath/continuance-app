import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import ContactDetails from "./ContactDetails";
import CompanyPosition from "../company/CompanyPosition";
import { handleAddNewContact } from "../../actions";

const FORM_NAME = "new_contact";

const NewContact = ({ handleSubmit, addNewContact }) => {
  return (
    <div className="ui container">
      <h2 className="ui header">
        <i className="address card outline icon blue" />
        Add New Contact
      </h2>
      <form className="ui form" onSubmit={handleSubmit(addNewContact)}>
        <ContactDetails form={FORM_NAME} />
        <CompanyPosition form={FORM_NAME} />
        <button className="ui primary button" type="submit">
          Create New Contact
        </button>
      </form>
    </div>
  );
};

const formFunc = reduxForm({ form: FORM_NAME })(NewContact);

export default connect(
  null,
  { addNewContact: handleAddNewContact }
)(formFunc);
