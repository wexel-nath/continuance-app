import React from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

export const SidebarGroup = ({ header, children }) => {
  return (
    <List>
      <ListSubheader inset>{header}</ListSubheader>
      {children}
    </List>
  );
};

export const SidebarLink = ({ icon, primary, to }) => {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};
