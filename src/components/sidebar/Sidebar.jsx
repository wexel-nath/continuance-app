import React from "react";
import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="ui massive fluid vertical menu vertical-menu">
      <SidebarItem header="Contacts">
        <Link className="item sidebar-link" to="/contacts/new">
          Add New
        </Link>
        <Link className="item sidebar-link" to="/contacts/search">
          Search
        </Link>
        <Link className="item sidebar-link" to="/contacts">
          View All
        </Link>
      </SidebarItem>
      <SidebarItem /> {/* Empty SidebarItem to close off the segment */}
    </div>
  );
};

export default Sidebar;
