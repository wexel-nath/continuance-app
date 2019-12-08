import React from "react";

import SidebarGroup from "./SidebarItem";
import SidebarLink from "./SidebarLink";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="ui left visible vertical sidebar menu sidebar-menu">
      <SidebarGroup header="Home">
        <SidebarLink title="Recent Events" to="/" />
      </SidebarGroup>
      <SidebarGroup header="Contacts">
        <SidebarLink to="/contacts/new" icon="plus circle" title="Add New" />
        <SidebarLink to="/contacts/upload" icon="cloud upload" title="Upload" />
        <SidebarLink to="/contacts/search" icon="search" title="Search" />
        <SidebarLink
          to="/contacts"
          icon="address book outline"
          title="View All"
        />
      </SidebarGroup>
      <SidebarGroup header="Submissions">
        <SidebarLink to="/submissions" icon="archive" title="View All" />
      </SidebarGroup>
    </div>
  );
};

export default Sidebar;
