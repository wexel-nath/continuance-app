import React from "react";
import { Route } from "react-router-dom";

import NewContact from "./contacts/NewContact";
import Sidebar from "./sidebar/Sidebar";

class Content extends React.Component {
  render() {
    return (
      <div className="ui stackable grid">
        <div className="three wide column collapsed">
          <Sidebar />
        </div>
        <div className="thirteen wide column collapsed">
          <div className="ui hidden divider" />
          <Route exact path="/contacts/new" component={NewContact} />
        </div>
      </div>
    );
  }
}

export default Content;
