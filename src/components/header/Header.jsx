import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { handleLogOut } from "../../actions";

import logo from "../../img/continuance_logo.jpg";
import "./Header.css";

class Header extends React.Component {
  componentDidUpdate() {
    window.$(".ui.dropdown").dropdown();
  }

  renderUserOptionsMenu(firstName) {
    return (
      <div className="right menu">
        <div className="ui dropdown item user-dropdown">
          <h3 className="ui header">{firstName}</h3>
          <i className="blue large user icon" />
          <div className="menu">
            <Link className="item" to="preferences">
              Preferences
            </Link>
            <div className="item" onClick={this.props.handleLogOut}>
              Logout
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loggedIn, user } = this.props;
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
        {loggedIn && this.renderUserOptionsMenu(user.firstName)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { loggedIn, user } }) => {
  return {
    loggedIn,
    user
  };
};

export default connect(
  mapStateToProps,
  { handleLogOut }
)(Header);
