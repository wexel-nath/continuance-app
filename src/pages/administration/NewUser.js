import React, { useState } from "react";
import { decamelizeKeys as toSnakeCase } from "humps";

import Container from "@material-ui/core/Container";

import { newUser } from "../../api/authentication";
import history from "../../history";
import useForm from "../../components/helper/useForm";
import { FormSubmit, FormError } from "../../components/helper/formHelpers";
import UserDetails from "../../components/users/UserDetails";

const mapFormToUser = values => {
  const { firstName, lastName, email, permissions = [] } = values;
  const user = {
    firstName,
    lastName,
    email,
    permissions: permissions.map(permission => permission.permissionId)
  };

  return toSnakeCase(user);
};

const validate = ({ firstName, lastName, email }) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = "First Name is required";
  }
  if (!lastName) {
    errors.lastName = "Last Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }

  return errors;
};

const useNewUser = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewContact = async values => {
    setLoading(true);
    const {
      data: { meta },
      status,
      statusText
    } = await newUser(mapFormToUser(values));
    setLoading(false);

    if (status === 201) {
      history.push("/users");
    } else {
      setErr(meta || statusText);
    }
  };

  const formValues = useForm(handleNewContact, validate);
  return [formValues, err, loading];
};

const NewUser = () => {
  const [formValues, err, loading] = useNewUser();

  return (
    <Container maxWidth="md">
      <form onSubmit={formValues.handleSubmit} noValidate>
        <UserDetails formValues={formValues} />
        <FormSubmit loading={loading} text="Create New User" />
        <FormError error={err} />
      </form>
    </Container>
  );
};

export default NewUser;
