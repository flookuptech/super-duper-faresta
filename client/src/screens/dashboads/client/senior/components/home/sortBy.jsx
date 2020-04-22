import React, { Fragment } from "react";
import {
  Grid,
  Button,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectField({ onChange, options, label, name }) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const classes = useStyles();

  return (
    <div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
        fullWidth
      >
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {label}
        </InputLabel>
        <Select onChange={onChange} name={name} labelWidth={labelWidth}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((item) => {
            return <MenuItem value={item.id}>{item.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

const SortBy = ({
  onChange,
  onSubmit,
  locationData,
  verifiedOnly,
  reportsData,
}) => {
  return (
    <Fragment>
      <br />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12} md={3} lg={3}>
          <SelectField
            name="location"
            onChange={onChange}
            label="Location"
            options={locationData}
          />
        </Grid>
        <br />
        <Grid item xs={12} md={3} lg={3}>
          <SelectField
            name="verifiedStatus"
            onChange={onChange}
            label="Verified Status"
            options={verifiedOnly}
          />
        </Grid>
        <br />
        <Grid item xs={12} md={3} lg={3}>
          <SelectField
            name="category"
            onChange={onChange}
            label="Category"
            options={reportsData}
          />
        </Grid>
      </Grid>
      <Grid container justify="center" alignContent="center">
        <Button
          onClick={onSubmit}
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#009933",
            color: "white",
            marginTop: 20,
            minWidth: "14vw",
            fontSize: 15,
          }}
        >
          Get Reports
        </Button>
      </Grid>
    </Fragment>
  );
};

export default SortBy;
