import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Spinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "30%"
      }}
    >
      <Grid container direction="column" alignItems="center">
        <CircularProgress />
        <Typography style={{ marginTop: "10px" }}>Loading</Typography>
      </Grid>
    </div>
  );
};

const Progress = ({ children, loading }) => {
  return loading ? <Spinner /> : <>{children}</>;
};

export default Progress;
