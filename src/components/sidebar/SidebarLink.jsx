import React from "react";
import { Link, withRouter } from "react-router-dom";

const SidebarLink = ({ to, icon, title, location }) => {
  const active = to === location.pathname;
  return (
    <Link to={to} className={`${active && "active"} item`}>
      {title}
      <i className={`${icon} icon`} />
    </Link>
  );
};

export default withRouter(SidebarLink);
