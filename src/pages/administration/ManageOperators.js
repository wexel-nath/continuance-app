import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Loader from "../../components/helper/Loader";
import { getAllUsers } from "../../api/authentication";
import OperatorsCard from "../../components/operators/OperatorsCard";

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

const ManageOperators = () => {
  const [users, loading] = useUsers();

  return (
    <Container maxWidth="lg">
      {loading && <Loader text="Loading" />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OperatorsCard users={users} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageOperators;
