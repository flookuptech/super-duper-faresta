import React, { Fragment } from "react";
import { InputBase, InputAdornment, Paper} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  input: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  iconPosition: {
    marginRight: theme.spacing(2)
  },
  searchIcon: {
    color: "#dfdfdf"
  }
}));

export default function CustomizedInputBase({ onChange, searchText }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <InputBase
          autoFocus
          className={classes.input}
          placeholder="Search assets"
          inputProps={{ "aria-label": "search assets" }}
          margin="dense"
          endAdornment={
            <InputAdornment position="end" className={classes.iconPosition}>
              {searchText ? (
                <CloseIcon className={classes.searchIcon} />
              ) : (
                <SearchRoundedIcon className={classes.searchIcon} />
              )}
            </InputAdornment>
          }
          name="searchText"
          fullWidth
          onChange={onChange}
        />
      </Paper>
    </Fragment>
  );
}
