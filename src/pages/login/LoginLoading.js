import React from "react";

import Loader from "../../components/helper/Loader";

import background from "../../img/continuance_cursed_background.jpg";

const LoginLoading = () => {
  return (
    <div className="ui container">
      <Loader />
      <img
        className="ui image"
        src={background}
        alt="Continuance Cursed Background"
      />
    </div>
  );
};

export default LoginLoading;
