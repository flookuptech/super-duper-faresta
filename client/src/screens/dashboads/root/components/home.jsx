import React, { Component, Fragment } from "react";
import {  Paper, withStyles } from "@material-ui/core";

const styles = {
  paper:{
    display: 'flex',
    flexDirection: "column",
    overflow: 'auto',
    padding: 16
  }
};

class Home extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.paper}>
          Home screen
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);
