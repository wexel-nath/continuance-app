import React from "react";
import ChangePassword from "./ChangePassword";

const Preferences = () => {
  return (
    <div className="ui container">
      <h2 className="ui header">
        <i className="cog icon blue" />
        Preferences
      </h2>
      <ChangePassword />
    </div>
  );
};

export default Preferences;
