import React from "react";
import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";
import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="ui massive fluid vertical menu vertical-menu">
        <SidebarItem header="Contacts">
          <SidebarLink
            linkValue="contact-add-new"
            onSidebarLinkClick={this.props.onSidebarLinkClick}
            value="Add New"
          />
          <SidebarLink
            linkValue="contact-search"
            onSidebarLinkClick={this.props.onSidebarLinkClick}
            value="Search"
          />
          <SidebarLink
            linkValue="contact-view-all"
            onSidebarLinkClick={this.props.onSidebarLinkClick}
            value="View All"
          />
        </SidebarItem>
        <SidebarItem /> {/* Empty SidebarItem to close off the segment */}
      </div>
    );
  }
}

export default Sidebar;
