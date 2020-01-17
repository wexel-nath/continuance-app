import React, { useContext } from "react";
import clsx from "clsx";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { logout } from "../../api/authentication";
import { getRefresh } from "../../util/storage";
import AuthContext from "../../context/AuthContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  }
}));

const MenuLink = ({ onClick, text, to }) => {
  const renderLink = React.forwardRef((linkProps, ref) => (
    <Link to={to} {...linkProps} innerRef={ref} />
  ));

  return (
    <MenuItem button component={renderLink} onClick={onClick}>
      {text}
    </MenuItem>
  );
};

const OptionsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setLoggedOut } = useContext(AuthContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(getRefresh());
    setLoggedOut();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
        color="inherit"
      >
        <SettingsIcon />
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuLink onClick={handleClose} text="Preferences" to="/preferences" />
        <MenuLink onClick={() => handleLogout()} text="Logout" to="/" />
      </Menu>
    </div>
  );
};

const pageTitles = {
  "/contacts": "View Contacts",
  "/contacts/:id": "Contact",
  "/contacts/new": "Add New Contact",
  "/contacts/upload": "Upload Contacts",
  "/contacts/search": "Search Contacts",
  "/preferences": "Preferences",
  "/submissions": "View Submissions",
  "/submissions/:id": "Submission",
  "/users": "Manage Users",
  "/": "Recent Events"
};

const Header = ({ open, setOpen, location }) => {
  const classes = useStyles();
  const pageTitle = pageTitles[location.pathname] || "";

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          className={classes.menuButton}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {pageTitle}
        </Typography>
        <OptionsMenu />
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
