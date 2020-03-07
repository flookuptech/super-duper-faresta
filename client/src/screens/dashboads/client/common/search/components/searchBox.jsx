import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, InputAdornment } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  searchIcon: {
    color: "#dfdfdf"
  }
}));

export default function CustomizedInputBase({ onChange, searchText }) {
  const classes = useStyles();
  return (
    <Fragment>
      <InputBase
        autoFocus
        className={classes.input}
        placeholder="Search assets"
        inputProps={{ "aria-label": "search assets" }}
        margin="dense"
        endAdornment={
          <InputAdornment position="end">
            {searchText ? (
              <CloseIcon className={classes.searchIcon} />
            ) : (
              <SearchRoundedIcon className={classes.searchIcon} />
            )}
          </InputAdornment>
        }
        name="searchText"
        onChange={onChange}
      />
    </Fragment>
  );
}
