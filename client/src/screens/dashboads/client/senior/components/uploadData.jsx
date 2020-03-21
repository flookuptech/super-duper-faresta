import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Button,
  Grid
} from "@material-ui/core";
// import CsvDownload from "react-json-to-csv";
import { ToastContainer, toast } from "react-toastify";
import UploadDataTable from "./uploadData/uploadDataTable";

import { saveAssetsData } from "services/sendAssetData";
import UploadCSV from "components/csvUpload";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    // height: "100vh",
    overflow: "auto"
  }
};

class UploadData extends Component {
  state = {
    data: ""
  };

  handleErrorOnUpload = error => {
    this.setState({ error });
  };

  handleFileUpload = data => {
    this.setState({ data: data });
  };

  handleSaveData = async () => {
    try {
      const result = await saveAssetsData(this.state.data);
      if (result.status === 200) toast.info(result.data.res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.err);
    }
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    return (
      <Fragment>
        <ToastContainer autoClose={false} />

        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Box className={classes.boxBorder}>
                <div>
                  <Typography component="h5" variant="h5">
                    Upload csv data
                  </Typography>
                </div>
                <br />
                <div>
                  <UploadCSV
                    onFileLoaded={this.handleFileUpload}
                    onError={this.handleErrorOnUpload}
                  />
                </div>
                <br />
                <div className="button-padding">
                  <Button
                    className="button-font-style"
                    variant="contained"
                    disabled={data ? false : true}
                    color="secondary"
                    onClick={this.handleSaveData}
                  >
                    &nbsp; Save to DataBase
                  </Button>
                </div>
                {/* <div className="button-padding button-styling">
                  <CsvDownload data={data} />
                </div> */}
              </Box>
              <br />
              {data && (
                <Box className={classes.boxBorder}>
                    <UploadDataTable data={data} />
                </Box>
              )}
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UploadData);
