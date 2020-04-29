import React, { Component, Fragment } from "react";
import { Paper, withStyles } from "@material-ui/core";

const styles = {
  paper:{
    display: 'flex',
    flexDirection: "column",
    overflow: 'auto',
    padding: 16
  }
}

class Reports extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.paper}>
          Reports Page
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Reports);
