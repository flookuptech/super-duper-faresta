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
import { getAssetsCategory } from "services/getAssets";

class AssetList extends Component {
  state = {
    result: [],
    category: ""
  };

  async componentDidMount() {
    try {
      const category = this.props.match.params.category;
      const { data } = await getAssetsCategory(category);
      this.setState({ result: data, category: category });
    } catch (error) {}
  }

  get assetsList() {
    const { result, category } = this.state;
    return (
      <Fragment>
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
                  to={`/dashboard/viewData/${category}/${item._id}`}
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
