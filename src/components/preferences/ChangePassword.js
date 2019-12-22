import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { FormSubmit, TextFieldInput } from "../helper/formHelpers";
import useForm from "../helper/useForm";
import { changePassword } from "../../api/authentication";
import useMessage from "../helper/useMessage";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "left"
  }
}));

const validate = ({ newPassword, confirmPassword }) => {
  const errors = {};

  if (!newPassword) {
    errors.newPassword = "Enter your new password";
  }
  if (!confirmPassword || newPassword !== confirmPassword) {
    errors.confirmPassword = "Type it again to confirm";
  }
  return errors;
};

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useMessage();

  const handleChangePassword = async ({ newPassword }) => {
    setLoading(true);
    const {
      data: { meta },
      status,
      statusText
    } = await changePassword(newPassword);

    if (status === 200) {
      showSuccess("Your password has been updated.");
    } else {
      showError(meta || statusText);
    }

    setLoading(false);
  };

  const formValues = useForm(handleChangePassword, validate);
  return [formValues, loading];
};

const ChangePassword = () => {
  const classes = useStyles();
  const [formValues, loading] = useChangePassword();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Change Password</Typography>
      <form onSubmit={formValues.handleSubmit} noValidate>
        <TextFieldInput
          name="newPassword"
          label="New Password"
          type="password"
          formValues={formValues}
        />
        <TextFieldInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          formValues={formValues}
        />
        <FormSubmit loading={loading} text="Change my password" />
      </form>
    </Paper>
  );
};

export default ChangePassword;
