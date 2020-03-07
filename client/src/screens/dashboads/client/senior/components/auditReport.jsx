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
  getReportsDataVerifiedOnly,
  getAuditorRemarksOnly,
  getJuniorRemarksOnly
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
    verifiedOnly: [],
    auditorRemarksOnly: [],
    juniorRemarksOnly: []
  };

  async componentDidMount() {
    const { data: reportsData } = await getReportsData();
    const { data: verifiedOnly } = await getReportsDataVerifiedOnly();
    const { data: auditorRemarksOnly } = await getAuditorRemarksOnly();
    const { data: juniorRemarksOnly } = await getJuniorRemarksOnly();
    this.setState({
      reportsData,
      verifiedOnly,
      auditorRemarksOnly,
      juniorRemarksOnly
    });
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

  getAuditorRemarkedAssets() {
    return this.state.auditorRemarksOnly.map((remark, counter) => {
      return (
        <Fragment>
          <p>
            {counter + 1}. Asset : {remark._id}
          </p>
        </Fragment>
      );
    });
  }

  getJuniorRemarkedAssets() {
    return this.state.juniorRemarksOnly.map((remark, counter) => {
      return (
        <Fragment>
          <p>
            {counter + 1}. Asset : {remark._id}
          </p>
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
                        <PieChart
                          data={reportsData}
                          schemeColor={{ scheme: "nivo" }}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Assets verificaton status
                      </Typography>
                      <div style={{ height: 300 }}>
                        <PieChartCanvas
                          data={verifiedOnly}
                          schemeColor={{ scheme: "accent" }}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Auditor remarked assets
                      </Typography>
                      <div style={{ height: 300 }}>
                        {this.getAuditorRemarkedAssets()}
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Junior remarked assets
                      </Typography>
                      <div style={{ height: 300 }}>
                        {this.getJuniorRemarkedAssets()}
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
