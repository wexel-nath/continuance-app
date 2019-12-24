import React, { useState } from "react";
import { decamelizeKeys as toSnakeCase } from "humps";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import ContactDetails from "../../components/contacts/ContactDetails";
import validate from "../../components/contacts/validateNewContact";
import CompanyPosition from "../../components/company/CompanyPosition";
import { newContact } from "../../api/continuance";
import history from "../../history";
import useForm from "../../components/helper/useForm";
import { FormSubmit, FormError } from "../../components/helper/formHelpers";

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
    <Container>
      <form onSubmit={formValues.handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <ContactDetails formValues={formValues} />
          </Grid>

          <Grid item sm={12} md={6}>
            <CompanyPosition formValues={formValues} />
          </Grid>
          <Grid item sm={12} md={6}>
            <FormSubmit loading={loading} text="Create New Contact" />
            <FormError error={err} />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewContact;
