import React, { useState } from "react";
import { decamelizeKeys as toSnakeCase } from "humps";

import ContactDetails from "../../components/contacts/ContactDetails";
import validate from "../../components/contacts/validateNewContact";
import CompanyPosition from "../../components/company/CompanyPosition";
import { newContact } from "../../api/continuance";
import history from "../../history";
import useForm from "../../components/helper/useForm";

const mapFormToContact = formValues => {
  let contact = formValues;

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

const useNewContact = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewContact = async formValues => {
    setLoading(true);
    const {
      data: { meta },
      status,
      statusText
    } = await newContact(mapFormToContact(formValues));
    setLoading(false);

    if (status === 201) {
      history.push("/contacts");
    } else {
      setErr(meta || statusText);
    }
  };

  const formValues = useForm(handleNewContact, validate);
  return [formValues, err, loading];
};

const NewContact = () => {
  const [formValues, err, loading] = useNewContact();

  return (
    <div className="ui container">
      <form
        className={`ui ${loading && "loading"} ${err && "warning"} form`}
        onSubmit={formValues.handleSubmit}
      >
        <ContactDetails formValues={formValues} />
        <CompanyPosition formValues={formValues} />
        {err && <div className="ui warning message">{err}</div>}
        <button className="ui primary button" type="submit" disabled={loading}>
          Create New Contact
        </button>
      </form>
    </div>
  );
};

export default NewContact;
