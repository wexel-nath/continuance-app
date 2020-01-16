import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InboxIcon from "@material-ui/icons/Inbox";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { SidebarGroup, SidebarLink } from "./SidebarItem";

import logo from "../../img/continuance_logo.jpg";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    maxWidth: "100%",
    padding: "0 8px"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  }
}));

const Sidebar = ({ open }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <a
        href="https://www.continuancepictures.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          className={classes.toolbarIcon}
          src={logo}
          alt="Continuance Pictures"
        />
      </a>

      <Divider />
      <SidebarGroup header="Home">
        <SidebarLink icon={<DateRangeIcon />} primary="Recent Events" to="/" />
      </SidebarGroup>

      <Divider />
      <SidebarGroup header="Contact Book">
        <SidebarLink
          icon={<PersonAddIcon />}
          primary="Add New"
          to="/contacts/new"
        />
        <SidebarLink
          icon={<GroupAddIcon />}
          primary="Import"
          to="/contacts/upload"
        />
        <SidebarLink
          icon={<SearchIcon />}
          primary="Search"
          to="/contacts/search"
        />
        <SidebarLink
          icon={<AccountBoxIcon />}
          primary="View All"
          to="/contacts"
        />
      </SidebarGroup>

      <Divider />
      <SidebarGroup header="Short Film Initiative">
        <SidebarLink
          icon={<InboxIcon />}
          primary="View All"
          to="/submissions"
        />
      </SidebarGroup>

      {/*<Divider />
      <SidebarGroup header="Administration">
        <SidebarLink
          icon={<SupervisorAccountIcon />}
          primary="Manage Operators"
          to="/operators"
      />
      </SidebarGroup>*/}
    </Drawer>
  );
};

export default Sidebar;
