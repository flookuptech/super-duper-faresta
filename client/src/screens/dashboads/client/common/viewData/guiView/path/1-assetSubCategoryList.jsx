import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  ListItemIcon
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { getDistinctAssetsSubCategory } from "services/getAssets";
import LoaderApp from "components/loaderApp";

class AssetSubCategory extends Component {
  state = {
    result: [],
    category: "",
    loading: true
  };

  async componentDidMount() {
    try {
      const { category } = this.props.match.params;
      const { data } = await getDistinctAssetsSubCategory(category);
      this.setState({ result: data, loading: false });
    } catch (error) {}
  }

  get assetsList() {
    const { result, loading } = this.state;
    const { category } = this.props.match.params;
    if (loading) return <LoaderApp />;

    return (
      <Fragment>
        <Typography component="p" variant="p">
          Total type of assets: <b>{result.length}</b>
        </Typography>
        <List>
          {result.map(item => {
            return (
              <Paper>
                <ListItem
                  key={item._id}
                  component={Link}
                  style={{ color: "black" }}
                  to={`/dashboard/viewData/${category}/${item.replace(
                    /\W/g,
                    "_"
                  )}`}
                >
                  <ListItemText primary={item} />
                  <ListItemIcon>
                    <NavigateNextIcon />
                  </ListItemIcon>
                </ListItem>
              </Paper>
            );
          })}
        </List>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Paper
          style={{
            display: 'flex',
            flexDirection: "column",
            overflow: 'auto',
            padding: 16
          }}>
          <div>{this.assetsList}</div>
        </Paper>
      </Fragment>
    );
  }
}

export default AssetSubCategory;
