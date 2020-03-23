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
import { getAssetsSubCategory } from "services/getAssets";
import LoaderApp from "components/loaderApp";

class AssetList extends Component {
  state = {
    result: [],
    category: "",
    loading: true,
    subcategory: ""
  };

  async componentDidMount() {
    try {
      const { category, subcategory } = this.props.match.params;
      const { data } = await getAssetsSubCategory(category, subcategory);
      this.setState({
        result: data,
        category: category,
        loading: false,
        subcategory: subcategory
      });
    } catch (error) {}
  }

  get assetsList() {
    const { result, category, loading, subcategory } = this.state;
    if (loading) return <LoaderApp />;

    return (
      <Fragment>
        <Typography component="p" variant="p">
          Asset List
        </Typography>
        <Typography component="p" variant="p">
          Total: <b>{result.length}</b>
        </Typography>
        <List>
          {result.map(item => {
            return (
              <Paper>
                <ListItem
                  key={item._id}
                  component={Link}
                  style={{ color: "black" }}
                  to={`/dashboard/viewData/${category}/${subcategory}/${item._id}`}
                >
                  <ListItemText primary={item.description} />
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
        <div>{this.assetsList}</div>
      </Fragment>
    );
  }
}

export default AssetList;
