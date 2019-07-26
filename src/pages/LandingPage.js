import React, { useEffect } from "react";

import PageTitle from "../components/helper/PageTitle";
import { getHealth } from "../api/continuance";

const LandingPage = () => {
  useEffect(() => {
    // call health endpoint to awaken continuance back-end
    getHealth();
  }, []);

  return (
    <div className="ui container">
      <PageTitle title="Recent Events" icon="calendar alternate outline" />
    </div>
  );
};

export default LandingPage;
