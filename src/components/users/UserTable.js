import React from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Row = ({ user }) => {
  const { firstName, lastName, email, username, lastLogin, userId } = user;

  return (
    <TableRow component={Link} to={`/users/${userId}`} hover>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{lastLogin}</TableCell>
    </TableRow>
  );
};

const UserTable = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Last Login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <Row user={user} key={user.userId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
