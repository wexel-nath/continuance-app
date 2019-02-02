import React from "react";

const SidebarLink = ({ onSidebarLinkClick, value }) => {
  return (
    <div onClick={onSidebarLinkClick} className="item sidebar-link">
      {value}
    </div>
  );
};

export default SidebarLink;
