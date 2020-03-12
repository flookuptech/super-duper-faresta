import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import SearchBox from "./components/searchBox";
import Form from "components/form/form";
import { searchQuery } from "services/search";

class Search extends Form {
  state = {
    searchText: ""
  };

  handleChange = e => {
    this.setState({ searchText: e.target.value }, () => {
      this.searchData();
    });
  };

  searchData = async () => {
    try {
      const results = await searchQuery(this.state.searchText);
      console.log(results);
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    const { searchText } = this.state;
    return (
      <Fragment>
        <Grid>
          <SearchBox onChange={this.handleChange} searchText={searchText} />
        </Grid>
      </Fragment>
    );
  }
}

export default Search;
