import React, { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";

const SortBy = ({ onChange, onSubmit, locationData }) => {
  return (
    <Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} md={3} lg={3}>
          <select name="location" onChange={onChange}>
            {locationData.map((location) => {
              return (
                <Fragment>
                  <option value={location.id}>{location.label}</option>
                </Fragment>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Button
            onClick={onSubmit}
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#009933",
              color: "white",
              marginTop: 20,
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SortBy;
