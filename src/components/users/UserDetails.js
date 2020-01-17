import React, { useEffect, useState } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { Input, SearchSelect } from "../helper/formHelpers";
import { getAllPermissions } from "../../api/authentication";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3)
  }
}));

const usePermissions = () => {
  const [permissions, setPermissions] = useState([]);

  const getPermissions = async () => {
    const {
      data: { result }
    } = await getAllPermissions();

    setPermissions(toCamelCase(result));
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return [permissions];
};

const UserDetails = ({ formValues }) => {
  const classes = useStyles();
  const [permissions] = usePermissions();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">User Details</Typography>
      <Input
        formValues={formValues}
        label="First Name"
        name="firstName"
        required
        type="text"
      />
      <Input
        formValues={formValues}
        label="Last Name"
        name="lastName"
        required
        type="text"
      />
      <Input
        formValues={formValues}
        label="Email"
        name="email"
        required
        type="text"
      />
      <SearchSelect
        formValues={formValues}
        getOptionLabel={option => option.permissionDescription}
        label="Permissions"
        name="permissions"
        options={permissions}
      />
    </Paper>
  );
};

export default UserDetails;
