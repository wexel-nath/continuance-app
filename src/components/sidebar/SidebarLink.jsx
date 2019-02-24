import React from "react";

const SidebarLink = ({ onClick, value }) => {
  return (
    <div className="item sidebar-link" onClick={onClick}>
      {value}
    </div>
  );
};

export default SidebarLink;
