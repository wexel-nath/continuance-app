import React from "react";

const SidebarGroup = ({ header, children }) => {
  return (
    <div>
      <h3 style={{ marginTop: "15px", marginLeft: "15px" }}>{header}</h3>
      {children}
    </div>
  );
};

export default SidebarGroup;
