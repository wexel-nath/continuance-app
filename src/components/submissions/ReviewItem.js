import React from "react";
import Markdown from "react-markdown";

import { Typography, Divider, Grid } from "@material-ui/core";

const Separator = () => {
  return <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />;
};

const ReviewItem = ({ rating, comments, criterion }) => {
  const { title, description } = criterion;

  return (
    <>
      <Separator />
      <Grid container direction="row" justify="space-between">
        <Grid item xs={9}>
          <Typography variant="h6">{title}</Typography>
          <Markdown source={description} />
        </Grid>
        <Grid item>
          <Typography variant="h6">Score</Typography>
          {rating}
        </Grid>
        <Grid item xs={12}>
          {comments}
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewItem;
