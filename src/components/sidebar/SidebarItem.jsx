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
  const renderLink = React.forwardRef((linkProps, ref) => (
    <Link to={to} {...linkProps} innerRef={ref} />
  ));

  return (
    <ListItem button component={renderLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};
