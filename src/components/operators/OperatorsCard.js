import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { ButtonLink } from "../ui/Button";

const OperatorsCardHeader = ({ text }) => {
  const title = <Typography variant="h6">{text}</Typography>;

  const createUserButton = (
    <ButtonLink text="Create an Operator" to={`/operators/new`} />
  );

  return (
    <CardHeader
      avatar={<SupervisorAccountIcon color="primary" />}
      title={title}
      action={createUserButton}
    />
  );
};

const OperatorsCard = ({ users }) => {
  console.log(users);

  return (
    <Card>
      <OperatorsCardHeader text="Manage Operators" />
      <CardContent>UserTable</CardContent>
    </Card>
  );
};

export default OperatorsCard;
