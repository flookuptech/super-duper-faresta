import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid
} from "@material-ui/core";

import { Helmet } from "react-helmet";
import { PieChart, PieChartCanvas } from "components/charts/pie";

import {
  getReportsData,
  getReportsDataVerifiedOnly
} from "services/getReportsData";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
};

class AuditReport extends Component {
  state = {
    reportsData: [],
    verifiedOnly: []
  };

  async componentDidMount() {
    const { data: reportsData } = await getReportsData();
    const { data: verifiedOnly } = await getReportsDataVerifiedOnly();
    this.setState({ reportsData, verifiedOnly });
  }

  getAssetsVerifiedStatus() {
    return this.state.verifiedOnly.map(item => {
      return (
        <Fragment>
          {item.id ? (
            <p>Verified : {item.value}</p>
          ) : (
            <p>Not Verified : {item.value}</p>
          )}
        </Fragment>
      );
    });
  }

  render() {
    const { classes } = this.props;
    const { reportsData, verifiedOnly } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Flookup | Audit Reports</title>
        </Helmet>
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Box className={classes.boxBorder}>
                <Fragment>
                  <Typography component="h5" variant="h5">
                    Audit Reports
                  </Typography>
                </Fragment>
                <br />
                {reportsData.length ? (
                  <Grid container direction="row" justify="space-between">
                    <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Assets count by category
                      </Typography>
                      <div style={{ height: 300 }}>
                        <PieChart data={reportsData} />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Assets count verificaton status
                      </Typography>
                      <div style={{ height: 300 }}>
                        <PieChartCanvas data={verifiedOnly} />
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <div>Upload some assets</div>
                )}
              </Box>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AuditReport);
