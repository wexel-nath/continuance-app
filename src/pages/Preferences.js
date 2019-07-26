import React from "react";

import ChangePassword from "../components/preferences/ChangePassword";
import PageTitle from "../components/helper/PageTitle";

const Preferences = () => {
  return (
    <div className="ui container">
      <PageTitle title="Preferences" icon="cog" />
      <ChangePassword />
    </div>
  );
};

export default Preferences;
