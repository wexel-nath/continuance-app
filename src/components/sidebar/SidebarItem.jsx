import React from "react";
import { Link } from "react-router-dom";

const SidebarGroup = ({ header, children, to }) => {
  const title = to ? <Link to={to}>{header}</Link> : header;
  return (
    <div>
      <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>{title}</h3>
      {children}
    </div>
  );
};

export default SidebarGroup;
