import React from "react";
import { SnackbarProvider } from "notistack";

import { makeStyles } from "@material-ui/core/styles";

import Content from "./Content";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar
}));

const FramedContent = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} />
      <SnackbarProvider>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Content />
        </main>
      </SnackbarProvider>
    </div>
  );
};

export default FramedContent;
