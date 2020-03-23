import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import DashboardLayout from "../../../../components/dashboard/dashboardLayout";
import Guide from "components/guide";
import ViewData from "../common/viewData/viewData";
import QRCodeList from "../common/qrCodeList";
import NotFound from "components/pageNotFound";
import EditProfile from "components/editProfile";
import AssetList from "../common/viewData/guiView/path/2-assetList";
import AssetInformation from "../common/viewData/guiView/path/3-assetInformation";
import CreateAsset from "./components/createAsset";
import FloorToFile from "../common/floorToFile/floorToFile";
import AssetSubCategoryList from "../common/viewData/guiView/path/1-assetSubCategoryList";

class JuniorUserDS extends Component {
  state = {};
  render() {
    return (
      <DashboardLayout user={this.props.user}>
        <Switch>
          <Route path="/dashboard/guide" component={Guide} />
          <Route path="/dashboard/qrList" component={QRCodeList} />
          <Route
            path="/dashboard/floorToFile"
            render={props => <FloorToFile user={this.props.user} {...props} />}
          />
          <Route
            path="/dashboard/viewData/:category/:subcategory/:id"
            render={props => (
              <AssetInformation user={this.props.user} {...props} />
            )}
          />
          <Route
            path="/dashboard/viewData/:category/:subcategory"
            component={AssetList}
          />
          <Route
            path="/dashboard/viewData/:category"
            component={AssetSubCategoryList}
          />
          <Route
            path="/dashboard/viewdata"
            render={props => <ViewData user={this.props.user} {...props} />}
          />
          <Route path="/dashboard/editprofile" component={EditProfile} />
          <Route exact path="/dashboard/" component={Home} />
          <Route
            path="/dashboard/createAsset"
            render={props => <CreateAsset user={this.props.user} {...props} />}
          />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default JuniorUserDS;
