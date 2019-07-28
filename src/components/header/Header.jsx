import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { clearUser } from "../../actions";
import { logout } from "../../api/authentication";
import { getRefresh, clearTokens } from "../../util/storage";
import history from "../../history";

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

const Header = ({ loggedIn, user, clearUser }) => {
  useEffect(() => {
    window.$(".ui.dropdown").dropdown();
  });

  const handleLogout = () => {
    logout(getRefresh());
    clearTokens();
    clearUser();
    history.push("/login");
  };

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
  { clearUser }
)(Header);
