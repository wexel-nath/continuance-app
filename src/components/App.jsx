import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Content from "./Content";
import Header from "./header/Header";
import "./App.css";

class App extends React.Component {
  state = {
    content: "",
    user: { first_name: "Guest" }
  };

  onSidebarLinkClick = value => {
    this.setState({ content: value });
  };

  render() {
    return (
      <div>
        <Header first_name={this.state.user.first_name} />
        <div className="ui stackable grid">
          <div className="three wide column collapsed">
            <Sidebar onSidebarLinkClick={this.onSidebarLinkClick} />
          </div>
          <div className="thirteen wide column collapsed">
            <Content content={this.state.content} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
