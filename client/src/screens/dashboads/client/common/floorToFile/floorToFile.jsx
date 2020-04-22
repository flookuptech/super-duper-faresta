import React, { Fragment } from "react";
import config from "config.js";
import http from "services/httpServices";
import { Box, Container, Typography, Button, Grid } from "@material-ui/core";
import Form from "components/form/form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import FloorToFileFields from "./dataFields";
import ImageUpload from "components/imageUpload";

const imageUploadUrlAuditor = config.apiUrl + "/imageUpload/auditorFileUpload";
const imageUploadUrl = config.apiUrl + "/imageUpload";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
};

export default class FloorToFile extends Form {
  state = {
    data: { assetFoundBy: this.props.user.name },
  };

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandlerAuditor = () => {
    const data = new FormData();
    if (!this.state.selectedFile) return;
    data.append("file", this.state.selectedFile);
    data.append("id", this.state.id);
    http.post(imageUploadUrlAuditor, data, {
      onUploadProgress: (ProgressEvent) => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
        });
      },
    });
    {
      this.props.user.role === "auditor"
        ? http.post(imageUploadUrlAuditor, data, {
            onUploadProgress: (ProgressEvent) => {
              this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
              });
            },
          })
        : http.post(imageUploadUrl, data, {
            onUploadProgress: (ProgressEvent) => {
              this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
              });
            },
          });
    }
  };

  onSubmit = async () => {
    console.log(this.state.data);
  };

  render() {
    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <main style={styles.content}>
          <Container maxWidth="lg">
            <br />
            <Box style={styles.boxBorder}>
              <Typography component="h5" variant="h5"></Typography>
              Floor to file
              <br />
              <form onSubmit={this.handleSubmit}>
                <Grid container direction="column">
                  <Grid item>
                    <ImageUpload
                      onChangeHandler={this.onChangeHandler}
                      onClickHandler={this.onClickHandlerAuditor}
                      loaded={this.state.loaded}
                      imageSet={this.state.selectedFile}
                    />
                    <br />
                  </Grid>
                  <Grid item>
                    <FloorToFileFields
                      onChange={this.handleOnChange}
                      onSubmit={this.handleSubmit}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
            <br />
          </Container>
        </main>
      </Fragment>
    );
  }
}
