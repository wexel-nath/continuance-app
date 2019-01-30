import React from "react";

const DropdownItem = ({ handleClick, text, value }) => {
  return (
    <div className="item" onClick={handleClick} data-value={value}>
      {text}
    </div>
  );
};

export default DropdownItem;
