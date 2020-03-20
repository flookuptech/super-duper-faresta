import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import PageviewIcon from "@material-ui/icons/Pageview";
import HelpIcon from "@material-ui/icons/Help";
import CropFreeIcon from "@material-ui/icons/CropFree";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PostAddIcon from "@material-ui/icons/PostAdd";


export default function ListDrawerItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/dashboard/"
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/createAsset"
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Create Asset" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/floorToFile"
        selected={selectedIndex === 3}
        onClick={event => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="Floor to file" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/viewData"
        selected={selectedIndex === 4}
        onClick={event => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <PageviewIcon />
        </ListItemIcon>
        <ListItemText primary="View Data" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/qrList"
        selected={selectedIndex === 5}
        onClick={event => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <CropFreeIcon />
        </ListItemIcon>
        <ListItemText primary="QR Codes" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/dashboard/guide"
        selected={selectedIndex === 6}
        onClick={event => handleListItemClick(event, 6)}
      >
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Guide" />
      </ListItem>
    </div>
  );
}
