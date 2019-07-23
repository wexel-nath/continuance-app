import React from "react";
import { Route, Switch } from "react-router-dom";

import ListContacts from "./contacts/ListContacts";
import NewContact from "./contacts/NewContact";
import SearchContacts from "./contacts/SearchContacts";
import Sidebar from "./sidebar/Sidebar";
import ViewContact from "./contacts/ViewContact";
import Preferences from "./preferences/Preferences";

import "./Content.css";

const Content = () => {
  return (
    <div className="ui bottom attached segment pushable pushable-content">
      <Sidebar />
      <div className="pusher">
        <div className="ui basic segment">
          <Switch>
            <Route exact path="/contacts/new" component={NewContact} />
            <Route exact path="/contacts" component={ListContacts} />
            <Route exact path="/contacts/search" component={SearchContacts} />
            <Route exact path="/contacts/:id" component={ViewContact} />
            <Route exact path="/preferences" component={Preferences} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Content;
