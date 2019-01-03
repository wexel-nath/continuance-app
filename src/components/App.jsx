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
      username: "",
      first_name: "",
      last_name: ""
    }
  };

  onSidebarLinkClick = value => {
    this.setState({ content: value });
  };

  onLogin = user => {
    this.setState({
      loggedIn: true,
      user: user
    });
  };

  onLogout() {
    this.setState({
      loggedIn: false,
      user: {
        username: "",
        first_name: "",
        last_name: ""
      }
    });
  }

  getContent() {
    if (!this.state.loggedIn) {
      return <Login onLogin={this.onLogin} />;
    }
    return (
      <div className="ui stackable grid">
        <div className="three wide column collapsed">
          <Sidebar onSidebarLinkClick={this.onSidebarLinkClick} />
        </div>
        <div className="thirteen wide column collapsed">
          <Content content={this.state.content} />
        </div>
      </div>
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
