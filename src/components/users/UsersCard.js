import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { ButtonLink } from "../ui/Button";
import UserTable from "./UserTable";

const UsersCardHeader = ({ text }) => {
  const title = <Typography variant="h6"> {text} </Typography>;

  const createUserButton = (
    <ButtonLink text="Create a User" to={`/users/new`} />
  );

  return (
    <CardHeader
      avatar={<SupervisorAccountIcon color="primary" />}
      title={title}
      action={createUserButton}
    />
  );
};

const UsersCard = ({ users }) => {
  return (
    <Card>
      <UsersCardHeader text="Manage Users" />
      <CardContent>
        <UserTable users={users} />
      </CardContent>
    </Card>
  );
};

export default UsersCard;
