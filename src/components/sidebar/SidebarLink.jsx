import React from "react";

const SidebarLink = ({ linkValue, onSidebarLinkClick, value }) => {
  return (
    <div
      onClick={() => onSidebarLinkClick(linkValue)}
      className="item sidebar-link"
    >
      {value}
    </div>
  );
};

export default SidebarLink;
