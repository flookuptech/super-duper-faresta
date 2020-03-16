import React, { Fragment } from "react";
import { Button, Grid, Box, Container, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import config from "config.js";
import Dialog from "components/dialog";
import Form from "components/form/form";
import http from "services/httpServices";
import { getUser } from "services/getToken";
import SwitchSelector from "components/switch";
import AssetInfoFields from "./assetInfoFields";
import ImageUpload from "components/imageUpload";
import { getAssetById } from "services/getAssets";
import { deleteAsset } from "services/deleteAsset";
import { sendEditedData } from "services/sendAssetData";
import { verifyAsset } from "services/assetVerification";
import QRCodeGenerator from "components/qrCodeGenerator";
import MultiSelect from "@khanacademy/react-multi-select";
import ModalImage from "react-modal-image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { options } from "./fieldsArray";

const imageUploadUrl = config.apiUrl + "/imageUpload";
const imageUploadUrlAuditor = config.apiUrl + "/imageUpload/auditorFileUpload";

class AssetInformation extends Form {
  state = {
    id: "",
    selectedFile: null,
    loaded: 0,
    data: {
      remarkJunior_1: "",
      remarkJunior_2: "",
      remarkJunior_3: "",
      remarkAuditor_1: "",
      remarkAuditor_2: "",
      remarkAuditor_3: ""
    },
    selected: []
  };

  async componentDidMount() {
    try {
      const category = this.props.match.params.category;
      const assetId = this.props.match.params.id;
      const { data: assetDataFrom } = await getAssetById(category, assetId);
      this.setState({
        data: assetDataFrom[0],
        id: assetId,
        selected: assetDataFrom[0].assetTags
      });
    } catch (error) {}
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  printOrder = () => {
    const printableElements = document.getElementById("printme").innerHTML;
    const orderHtml =
      "<html><head><title></title></head><body>" +
      printableElements +
      "</body></html>";
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = orderHtml;
    window.print();
    document.body.innerHTML = oldPage;
  };

  onClickHandler = () => {
    const data = new FormData();
    if (!this.state.selectedFile) return;
    data.append("file", this.state.selectedFile);
    data.append("id", this.state.id);
    try {
      http.post(imageUploadUrl, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      });
      toast.success("Image Uploaded");
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  onClickHandlerAuditor = () => {
    const data = new FormData();
    if (!this.state.selectedFile) return;
    data.append("file", this.state.selectedFile);
    data.append("id", this.state.id);
    http.post(imageUploadUrlAuditor, data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
        });
      }
    });
  };

  handleSave = async () => {
    const { data } = this.state;
    data["assetTags"] = this.state.selected;
    console.log(data);
    try {
      const { data: result } = await sendEditedData(data, this.state.id);
      toast.success(result.res);
    } catch (error) {
      toast.error(error.response.data.err);
    }
  };

  deleteAssetById = async () => {
    try {
      const data = await deleteAsset(this.state.id);
      if (data.status === 200) {
        toast.info(data.data.res);
        setTimeout(() => {
          this.props.history.goBack();
        }, 1700);
      }
    } catch (error) {
      const { data } = error.response;
      toast.error(data.res);
    }
  };

  handleChangeSwitch = () => {
    const data = { ...this.state.data };
    data["verifiedStatus"] = !data["verifiedStatus"];
    this.setState({ data }, () => {
      this.verifyAssetChange();
    });
  };

  verifyAssetChange = async () => {
    const { id } = this.state;
    const { verifiedStatus } = this.state.data;
    try {
      const result = await verifyAsset(verifiedStatus, id);
      if (result.status === 200) toast.success(result.data.res);
    } catch (error) {
      const { data } = error.response;
      toast.error(data.err);
    }
  };

  render() {
    const data = JSON.parse(getUser());
    const dbName = data.orgDatabase;
    const { id } = this.state;
    const { verifiedStatus, imageUri, imageUriByAuditor } = this.state.data;
    const selected = this.state.selected;
    const { user } = this.props;

    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <Container maxWidth="lg">
          <Box>
            <Grid container direction="column">
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <div id="printme">
                    <QRCodeGenerator id={id} keyValue={dbName} />
                  </div>
                  <button onClick={() => this.printOrder()}>Print</button>
                  {user.role === "senior" && (
                    <div className="upload-btn-style">
                      <ImageUpload
                        onChangeHandler={this.onChangeHandler}
                        onClickHandler={this.onClickHandler}
                        loaded={this.state.loaded}
                        imageSet={this.state.selectedFile}
                      />
                    </div>
                  )}
                  {user.role === "auditor" && (
                    <div className="upload-btn-style">
                      <ImageUpload
                        onChangeHandler={this.onChangeHandler}
                        onClickHandler={this.onClickHandlerAuditor}
                        loaded={this.state.loaded}
                        imageSet={this.state.selectedFile}
                      />
                    </div>
                  )}
                </Grid>
                <Grid item>
                  <ModalImage
                    className="image-upload-style"
                    small={imageUri}
                    large={imageUri}
                    alt="Image Preview"
                  />
                </Grid>
                <Grid item>
                  <p>Auditor Uploaded Image</p>
                  <ModalImage
                    className="image-upload-style"
                    small={imageUriByAuditor}
                    large={imageUriByAuditor}
                    alt="Image Preview"
                  />
                </Grid>
              </Grid>
              <br />
              <Grid
                container
                justify={user.role === "auditor" ? "space-between" : "flex-end"}
                alignItems="center"
                direction="row"
              >
                {user.role === "auditor" && (
                  <Grid item lg={3} xs={6} md={6}>
                    <MultiSelect
                      overrideStrings={{
                        selectSomeItems: "Tag incase error...",
                        search: "Search tag"
                      }}
                      options={options}
                      selected={selected}
                      onSelectedChanged={selected =>
                        this.setState({ selected })
                      }
                    />
                  </Grid>
                )}
                <Grid item>
                  <Typography
                    variant="overline"
                    display="block"
                    style={{ fontWeight: "500", fontSize: 15 }}
                  >
                    Asset Verified:
                  </Typography>
                </Grid>
                <Grid item>
                  <SwitchSelector
                    onChangeHandler={
                      user.role === "auditor" ? this.handleChangeSwitch : null
                    }
                    checked={verifiedStatus}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid>
                <AssetInfoFields
                  assetData={this.state.data}
                  handleOnChange={this.handleOnChange}
                  user={user}
                />
              </Grid>
              <br />
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveIcon />}
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
                </Grid>
                {user.role === "senior" && (
                  <Grid item>
                    <Dialog onClick={this.deleteAssetById} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
        <br />
      </Fragment>
    );
  }
}

export default AssetInformation;
