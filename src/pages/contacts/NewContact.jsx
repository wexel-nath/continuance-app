import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { decamelizeKeys as toSnakeCase } from "humps";

import ContactDetails from "../../components/contacts/ContactDetails";
import validate from "../../components/contacts/validateNewContact";
import CompanyPosition from "../../components/company/CompanyPosition";
import PageTitle from "../../components/helper/PageTitle";
import { newContact } from "../../api/continuance";
import history from "../../history";

const FORM_NAME = "new_contact";

const mapFormToContact = formValues => {
  let contact = formValues;
  if (contact.locationBased) {
    contact.locationBased = contact.locationBased.label;
  }
  if (contact.locationMet) {
    contact.locationMet = contact.locationMet.label;
  }

  contact.company =
    formValues.companySelector === "new"
      ? {
          companyName: formValues.companyName,
          companyWebsite: formValues.companyWebsite,
          companyExpertise: formValues.companyExpertise,
          companyDescription: formValues.companyDescription
        }
      : {
          companyId: parseInt(formValues.companySelector)
        };
  return toSnakeCase(contact);
};

class NewContact extends React.Component {
  state = {
    message: "",
    loading: false
  };

  handleAddNewContact = async formValues => {
    this.setState({ message: "", loading: true });

    const {
      data: { meta },
      status,
      statusText
    } = await newContact(mapFormToContact(formValues));

    if (status === 201) {
      history.push("/contacts");
    } else {
      const message = meta || statusText;
      this.setState({ message, loading: false });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    const { message, loading } = this.state;
    return (
      <div className="ui container">
        <PageTitle title="Add New Contact" icon="plus circle" />
        <form
          className={`ui ${loading && "loading"} ${message && "warning"} form`}
          onSubmit={handleSubmit(this.handleAddNewContact)}
        >
          <ContactDetails form={FORM_NAME} />
          <CompanyPosition form={FORM_NAME} />
          {message && <div className="ui warning message">{message}</div>}
          <button
            className="ui primary button"
            type="submit"
            disabled={loading}
          >
            Create New Contact
          </button>
        </form>
      </div>
    );
  }
}

const formFunc = reduxForm({
  form: FORM_NAME,
  validate
})(NewContact);

export default connect()(formFunc);
