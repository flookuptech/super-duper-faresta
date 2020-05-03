import React, { Fragment } from "react";
import { Paper, Typography } from "@material-ui/core";

const styles = {
  root: {
    width: "100%",
  },
};

const CsvErrors = ({ errors }) => {
  return (
    <Fragment>
      <Typography component="h5" variant="h5">
        Error logs
      </Typography>
      {errors.map((err) => {
        return (
          <>
            <div>{err.message}</div>
            <div>
              Row: {err.path[0]} Column: {err.path[1]}
            </div>
            <div></div>
            <div>
              Value provided:{" "}
              {err.context.value === null ? "None" : err.context.value}
            </div>
            <br />
          </>
        );
      })}
    </Fragment>
  );
};

export default CsvErrors;
