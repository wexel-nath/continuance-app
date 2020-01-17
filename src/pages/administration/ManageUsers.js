import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { getAllUsers } from "../../api/authentication";
import UsersCard from "../../components/users/UsersCard";
import Progress from "../../components/helper/Progress";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const {
      data: { result }
    } = await getAllUsers();

    setUsers(toCamelCase(result));
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return [users, loading];
};

const ManageUsers = () => {
  const [users, loading] = useUsers();

  return (
    <Container maxWidth="lg">
      <Progress loading={loading}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UsersCard users={users} />
          </Grid>
        </Grid>
      </Progress>
    </Container>
  );
};

export default ManageUsers;
