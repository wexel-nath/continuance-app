import React from "react";
import "./DropdownList.css";

const DropdownList = ({ active, children }) => {
  return (
    active && (
      <div className="ui tertiary inverted blue segment dropdown-list">
        {children}
      </div>
    )
  );
};

export default DropdownList;
