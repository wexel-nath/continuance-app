import React from "react";

const SidebarItem = ({ header, children }) => {
  return (
    <div className="item">
      <div className="header">{header}</div>
      <div className="menu">{children}</div>
    </div>
  );
};

export default SidebarItem;
