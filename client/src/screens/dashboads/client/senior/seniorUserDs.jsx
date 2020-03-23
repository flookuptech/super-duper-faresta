import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "components/pageNotFound";
import EditProfile from "components/editProfile";
import AddUsers from "./components/addUsers/addUsers";
import UsersList from "./components/userList";
import ViewData from "../common/viewData/viewData";
import Reports from "./components/auditReport";
import UploadData from "./components/uploadData";
import Home from "./components/home";
import DashboardLayout from "../../../../components/dashboard/dashboardLayout";
import Guide from "components/guide";
import AssetList from "../common/viewData/guiView/path/2-assetList";
import AssetInformation from "../common/viewData/guiView/path/3-assetInformation";
import QRCodeList from "../common/qrCodeList";
import SearchAsset from "../common/search/searchIndex";
import AssetSubCategoryList from "../common/viewData/guiView/path/1-assetSubCategoryList";
class SeniorUserDS extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route path="/dashboard/search" component={SearchAsset} />
          <Route path="/dashboard/qrList" component={QRCodeList} />
          <Route
            path="/dashboard/viewData/:category/:subcategory/:id"
            render={props => <AssetInformation user={user} {...props} />}
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
            path="/dashboard/viewData"
            render={props => <ViewData user={user} {...props} />}
          />
          <Route path="/dashboard/uploadData" component={UploadData} />
          <Route path="/dashboard/reports" component={Reports} />
          <Route
            path="/dashboard/addUsers"
            render={props => <AddUsers user={user} {...props} />}
          />
          <Route
            path="/dashboard/usersList"
            render={props => <UsersList user={user} {...props} />}
          />
          <Route path="/dashboard/guide" component={Guide} />
          <Route exact path="/dashboard/editprofile" component={EditProfile} />
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default SeniorUserDS;
