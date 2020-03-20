import React, { Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid,
  Button,
  ButtonGroup
} from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";
import InsertChartIcon from "@material-ui/icons/InsertChart";
// import CsvDownload from "react-json-to-csv";
import { CSVLink } from "react-csv";
import Form from "components/form/form";
import { getAllAssets } from "services/getAssets";
import LoaderApp from "components/loaderApp";
import GUIView from "./guiView/guiView";
import TabularView from "./tabularView/tabularView";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    height: "auto",
    overflow: "auto"
  },
  text: {
    textDecoration: "none"
  }
};

class ViewData extends Form {
  state = {
    assetData: [],
    view: true,
    loading: true
  };

  async componentDidMount() {
    const { data } = await getAllAssets();
    this.setState({ assetData: data, loading: false });
  }

  handleViewChange = () => {
    this.setState({ view: false });
  };

  handleViewChangeGUI = () => {
    this.setState({ view: true });
  };

  render() {
    const { classes } = this.props;
    const { view, assetData, loading } = this.state;
    return (
      <Fragment>
        {loading && <LoaderApp />}
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Box className={classes.boxBorder}>
                <div>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={8}>
                      <Typography component="h5" variant="h5">
                        View assets data
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                      <CSVLink
                        data={this.state.assetData}
                        className={classes.text}
                      >
                        <Button
                          className="button-font-style"
                          variant="contained"
                          style={{
                            backgroundColor: "white",
                            color: "#009933"
                          }}
                        >
                          Download CSV
                        </Button>
                      </CSVLink>
                      {/* Do not delete the below component */}
                      {/* <CsvDownload data={this.state.data} /> */}
                    </Grid>
                  </Grid>
                </div>
              </Box>
              <br />
              <Box className={classes.boxBorder}>
                <div className="button-align">
                  <ButtonGroup>
                    <Button
                      className="button-background"
                      variant="contained"
                      color="secondary"
                      onClick={this.handleViewChangeGUI}
                    >
                      <InsertChartIcon className="icon-background" />
                    </Button>
                    <Button
                      className="button-background"
                      variant="contained"
                      color="secondary"
                      onClick={this.handleViewChange}
                    >
                      <GridOnIcon className="icon-background" />
                    </Button>
                  </ButtonGroup>
                </div>
                <div>
                  {view ? <GUIView /> : <TabularView data={assetData} />}
                </div>
                <br />
              </Box>
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ViewData);
