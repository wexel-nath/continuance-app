import React from "react";

const DropdownItem = ({ handleClick, text }) => {
  return (
    <div className="item" onClick={handleClick}>
      {text}
    </div>
  );
};

export default DropdownItem;
