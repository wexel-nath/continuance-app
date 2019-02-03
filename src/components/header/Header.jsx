import React from "react";
import { connect } from "react-redux";
import { handleLogOut } from "../../actions";

import DropdownItem from "../ui/DropdownItem";

import logo from "../../img/continuance_logo.jpg";
import "./Header.css";

class Header extends React.Component {
  componentDidUpdate() {
    window.$(".ui.dropdown").dropdown();
  }

  renderUserOptions(firstName) {
    return (
      <div className="right menu">
        <div className="ui dropdown item user-dropdown">
          <h3 className="ui header">{firstName}</h3>
          <i className="blue large user icon" />
          <div className="menu">
            <DropdownItem text="Logout" handleClick={this.props.handleLogOut} />
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
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="continuance-logo" />
        </a>
        {loggedIn && this.renderUserOptions(user.first_name)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { handleLogOut }
)(Header);
