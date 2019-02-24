import React from "react";

import history from "../../history";
import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="ui massive fluid vertical menu vertical-menu">
      <SidebarItem header="Contacts">
        <SidebarLink
          onClick={() => history.push("/contacts/new")}
          value="Add New"
        />
        <SidebarLink
          onClick={() => history.push("/contacts/search")}
          value="Search"
        />
        <SidebarLink
          onClick={() => history.push("/contacts")}
          value="View All"
        />
      </SidebarItem>
      <SidebarItem /> {/* Empty SidebarItem to close off the segment */}
    </div>
  );
};

export default Sidebar;
