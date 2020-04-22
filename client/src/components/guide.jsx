import React, { Fragment } from "react";
import { Paper } from "@material-ui/core";


const Guide = () => {
  return (
    <Fragment>
      <Paper 
        style={{
          display: 'flex',
          flexDirection: "column",
          overflow: 'auto',
          padding: 16
      }}>
        <div>Welcome to guide page</div>
        <a href="https://fixed-asset-flookup.s3.ap-south-1.amazonaws.com/FAR-Template.csv">
          CSV Template
        </a>
      </Paper>
    </Fragment>
  );
};

export default Guide;
