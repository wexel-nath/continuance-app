import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { logout } from "../../api/authentication";
import { getRefresh } from "../../util/storage";
import history from "../../history";
import AuthContext from "../../context/AuthContext";

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

const Header = () => {
  useEffect(() => {
    window.$(".ui.dropdown").dropdown();
  });
  const { user, isAuthenticated, setLoggedOut } = useContext(AuthContext);

  const handleLogout = () => {
    logout(getRefresh());
    setLoggedOut();
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
      {isAuthenticated && (
        <OptionsMenu firstName={user.firstName} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default Header;
