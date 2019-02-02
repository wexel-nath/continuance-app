import React from "react";
import { withRouter } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";
import "./Sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="ui massive fluid vertical menu vertical-menu">
        <SidebarItem header="Contacts">
          <SidebarLink
            onSidebarLinkClick={() => this.props.history.push("/contacts/new")}
            value="Add New"
          />
          <SidebarLink
            onSidebarLinkClick={() =>
              this.props.history.push("/contacts/search")
            }
            value="Search"
          />
          <SidebarLink
            linkValue="contact-view-all"
            onSidebarLinkClick={() => this.props.history.push("/contacts")}
            value="View All"
          />
        </SidebarItem>
        <SidebarItem /> {/* Empty SidebarItem to close off the segment */}
      </div>
    );
  }
}

export default withRouter(Sidebar);
