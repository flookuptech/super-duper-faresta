import React, { Fragment } from "react";
import BrandAppLoader from "../assets/images/brand/flookupGif.gif";
import { Grid } from "@material-ui/core";

const LoaderApp = () => {
  return (
    <Fragment>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <img src={BrandAppLoader} alt={"loader"} style={{ height: 140 }} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LoaderApp;
