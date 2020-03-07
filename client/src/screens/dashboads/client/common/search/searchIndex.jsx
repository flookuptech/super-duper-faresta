import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import SearchBox from "./components/searchBox";
import Form from "components/form/form";

const style = {};

class Search extends Form {
  state = {
    data: {}
  };
  render() {
    const { searchText } = this.state.data;
    return (
      <Fragment>
        <SearchBox onChange={this.handleOnChange} searchText={searchText} />
      </Fragment>
    );
  }
}

export default withStyles(style)(Search);
