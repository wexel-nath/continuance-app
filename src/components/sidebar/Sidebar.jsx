import React from "react";

import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";
import history from "../../history";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="ui massive fluid vertical menu vertical-menu">
      <SidebarItem header="Contacts">
        <SidebarLink
          onSidebarLinkClick={() => history.push("/contacts/new")}
          value="Add New"
        />
        <SidebarLink
          onSidebarLinkClick={() => history.push("/contacts/search")}
          value="Search"
        />
        <SidebarLink
          onSidebarLinkClick={() => history.push("/contacts")}
          value="View All"
        />
      </SidebarItem>
      <SidebarItem /> {/* Empty SidebarItem to close off the segment */}
    </div>
  );
};

export default Sidebar;
