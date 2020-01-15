import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

export const ButtonLink = ({ text, to }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Button variant="contained" color="primary">
        {text}
      </Button>
    </Link>
  );
};
