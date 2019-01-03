import React from "react";

const DropdownItem = ({ value, selected, handleClick, handleMouseEnter }) => {
  let style = "floating item dropdown-item";
  selected && (style += " dropdown-selected");
  return (
    <div
      className={style}
      onMouseDown={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {value}
    </div>
  );
};

export default DropdownItem;
