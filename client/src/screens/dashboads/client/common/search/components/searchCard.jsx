import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Card,
  ListItemIcon
} from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

class AssetList extends Component {
    constructor(props) {
        super(props);
        this.state = { shadow: 4 }
    }
      
    onMouseOver = () => this.setState({ shadow: 2 });
    onMouseOut = () => this.setState({ shadow: 4 });
    render(){
        const {category, subCategory, location, description, id} = this.props; 
        return (
            <Fragment>
                <List>
                    <Card
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut}
                        elevation={this.state.shadow}
                    >
                        <ListItem
                        key={id}
                        component={Link}
                        style={{ color: "black" }}
                        to={`/dashboard/viewData/${category}/${subCategory}/${id}`}
                        >
                            <ListItemText>
                                <Typography>{description}</Typography>
                                <Typography variant="overline" color="textSecondary">{location}</Typography>
                            </ListItemText>
                            <ListItemIcon>
                                <NavigateNextIcon />
                            </ListItemIcon>
                        </ListItem>
                    </Card>
                </List>
            </Fragment>
        );      
    }
}

export default AssetList;
