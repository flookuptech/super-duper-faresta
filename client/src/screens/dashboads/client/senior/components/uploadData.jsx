import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";
// import CsvDownload from "react-json-to-csv";
import { ToastContainer, toast } from "react-toastify";
import UploadDataTable from "./uploadData/uploadDataTable";
import CsvErrorLogs from "../../common/csvError";

import { saveAssetsData } from "services/sendAssetData";
import UploadCSV from "components/csvUpload";

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
  paper: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: 32,
  },
};

class UploadData extends Component {
  state = {
    data: "",
    errors: "",
  };

  handleErrorOnUpload = (error) => {
    this.setState({ error });
  };

  handleFileUpload = (data) => {
    this.setState({ data: data });
  };

  handleSaveData = async () => {
    try {
      const result = await saveAssetsData(this.state.data);
      if (result.status === 200) toast.info(result.data.res);
    } catch (error) {
      const err = error.response.data.err;
      if (Array.isArray(err)) this.setState({ errors: err });
      toast.error(error.response.data.msg);
    }
  };

  render() {
    const { classes, user } = this.props;
    const { data, errors } = this.state;

    return (
      <Fragment>
        <ToastContainer autoClose={false} />

        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper}>
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
                </Box>
              </Paper>
              <br />
              {errors && (
                <Paper className={classes.paper}>
                  <Box className={classes.boxBorder}>
                    <CsvErrorLogs errors={errors} />
                  </Box>
                </Paper>
              )}
              <br />
              {(data!=="" && errors==="")&&(
                <Paper className={classes.paper}>
                  <Box className={classes.boxBorder}>
                    <UploadDataTable data={data} user={user} />
                  </Box>
                </Paper>
              )}
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UploadData);
