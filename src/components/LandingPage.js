import React, { useEffect } from "react";

import { getHealth } from "../api/continuance";

const LandingPage = () => {
  useEffect(() => {
    // call health endpoint to awaken continuance back-end
    getHealth();
  }, []);

  return <div>{/* todo: recent events */}</div>;
};

export default LandingPage;
