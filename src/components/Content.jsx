import React from "react";
import { Route } from "react-router-dom";

import ListContacts from "./contacts/ListContacts";
import NewContact from "./contacts/NewContact";
import Sidebar from "./sidebar/Sidebar";

import "./Content.css";

const Content = () => {
  return (
    <div className="ui stackable grid content-grid">
      <div className="three wide column collapsed">
        <Sidebar />
      </div>
      <div className="thirteen wide padded column collapsed">
        <div className="ui basic segment">
          <Route exact path="/contacts/new" render={() => <NewContact />} />
          <Route exact path="/contacts" render={() => <ListContacts />} />
        </div>
      </div>
    </div>
  );
};

export default Content;
