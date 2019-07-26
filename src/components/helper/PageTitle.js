import React from "react";

const PageTitle = ({ title, icon }) => {
  return (
    <h2 className="ui header">
      {icon && <i className={`${icon} icon blue`} />}
      {title}
    </h2>
  );
};

export default PageTitle;
