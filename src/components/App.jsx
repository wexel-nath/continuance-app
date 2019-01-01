import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Content from "./Content";
import Header from "./header/Header";
import Login from "./login/Login";
import "./App.css";

class App extends React.Component {
  state = {
    content: "",
    loggedIn: false,
    user: {
      first_name: "",
      username: ""
    }
  };

  onSidebarLinkClick = value => {
    this.setState({ content: value });
  };

  onLogin = ({ first_name, username }) => {
    this.setState({
      loggedIn: true,
      user: {
        first_name: first_name,
        username: username
      }
    });
  };

  onLogout() {
    this.setState({
      loggedIn: false,
      user: {
        first_name: "Guest",
        username: ""
      }
    });
  }

  getContent() {
    return this.state.loggedIn ? (
      <div className="ui stackable grid">
        <div className="three wide column collapsed">
          <Sidebar onSidebarLinkClick={this.onSidebarLinkClick} />
        </div>
        <div className="thirteen wide column collapsed">
          <Content content={this.state.content} />
        </div>
      </div>
    ) : (
      <Login onLogin={this.onLogin} />
    );
  }

  render() {
    return (
      <div>
        <Header
          first_name={this.state.user.first_name}
          loggedIn={this.state.loggedIn}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
