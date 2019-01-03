import React from "react";
import logo from "../../img/continuance_logo.jpg";
import "./Header.css";

class Header extends React.Component {
  getUserWidget() {
    return (
      this.props.loggedIn && (
        <div className="right menu">
          <div className="ui dropdown item user-dropdown">
            <h3 className="ui header">{this.props.first_name}</h3>
            <i className="blue large user icon" />
          </div>
        </div>
      )
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="ui menu header-menu">
          <a
            className="ui image image-logo"
            href="https://www.continuancepictures.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="continuance-logo" />
          </a>
          {this.getUserWidget()}
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
