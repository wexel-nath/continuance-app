import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { handleLogout } from "../../actions";

import logo from "../../img/continuance_logo.jpg";
import "./Header.css";

const OptionsMenu = ({ firstName, handleLogout }) => {
  return (
    <div className="right menu">
      <div className="ui dropdown item user-dropdown">
        <h3 className="ui header">{firstName}</h3>
        <i className="blue large user icon" />
        <div className="menu">
          <Link className="item" to="/preferences">
            Preferences
          </Link>
          <div className="item" onClick={() => handleLogout(true)}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ loggedIn, user, handleLogout }) => {
  useEffect(() => {
    window.$(".ui.dropdown").dropdown();
  });

  return (
    <div className="ui menu header-menu">
      <a
        className="ui image image-logo"
        href="https://www.continuancepictures.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={logo} alt="continuance-logo" />
      </a>
      {loggedIn && (
        <OptionsMenu firstName={user.firstName} handleLogout={handleLogout} />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth: { loggedIn, user } }) => {
  return {
    loggedIn,
    user
  };
};

export default connect(
  mapStateToProps,
  { handleLogout }
)(Header);
