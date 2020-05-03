import React, { Fragment } from "react";
import InputField from "components/form/inputField";
import { assetInfoArray } from "../../common/viewData/guiView/path/fieldsArray";
import Form from "components/form/form";
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { createNewAsset } from "services/sendAssetData";
import CsvErrorLogs from "../../common/csvError";

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

class CreateAsset extends Form {
  state = {
    data: {},
  };

  handleSubmit = async () => {
    const data = {
      ...this.state.data,
    };
    try {
      const results = await createNewAsset(data);
      toast.success("Asset added");
    } catch (error) {
      toast.error(error.response.data.err);
    }
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <ToastContainer autoClose={false} />
        <main style={styles.content}>
          <Container maxWidth="lg">
            <br />
            <Paper style={styles.paper}>
              <Box style={styles.boxBorder}>
                <div>
                  <Typography component="h5" variant="h5">
                    Create Asset
                  </Typography>
                </div>
                <br />
                <div>
                  <Grid container spacing={3}>
                    {assetInfoArray.map((item) => {
                      return (
                        <Grid item xs={6} md={4} lg={3}>
                          <InputField
                            id="standard-read-only-input"
                            helperText={item.helperText}
                            name={item.value}
                            onChange={this.handleOnChange}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <br />
                  <Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="button-font-style"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </Paper>
            {errors && (
              <Paper className={styles.paper}>
                <Box className={styles.boxBorder}>
                  <CsvErrorLogs errors={errors} />
                </Box>
              </Paper>
            )}
          </Container>
        </main>
      </Fragment>
    );
  }
}

export default CreateAsset;
