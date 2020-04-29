import React, { Fragment, PureComponent } from "react";
import {
  Typography,
  Container,
  withStyles,
  Grid,
  Paper,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { PieChart } from "components/charts/pie";
import {
  getReportsData,
  getReportsDataVerifiedOnly,
  getLocationData,
} from "services/getReportsData";

import LoaderApp from "components/loaderApp";
import SortByFields from "./home/sortBy";
import { getSortedAssets } from "services/home/sortBy";

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
    padding: 32
  },
};

class AuditReport extends PureComponent {
  state = {
    loading: true,
    reportsData: [],
    verifiedOnly: [],
    auditorRemarksOnly: [],
    juniorRemarksOnly: [],
    locationData: [],
    startDate: "",
    endDate: "",
  };

  async componentDidMount() {
    try {
      const { data: reportsData } = await getReportsData();
      const { data: verifiedOnly } = await getReportsDataVerifiedOnly();
      // const { data: auditorRemarksOnly } = await getAuditorRemarksOnly();
      // const { data: juniorRemarksOnly } = await getJuniorRemarksOnly();
      const { data: locationData } = await getLocationData();
      this.setState({
        reportsData,
        verifiedOnly,
        locationData,
        loading: false,
      });
    } catch (error) {}
  }

  getAssetsVerifiedStatus() {
    return this.state.verifiedOnly.map((item) => {
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

  handleChange = ({ target }) => {
    const name = this.state;
    name[target.name] = target.value;
    this.setState({ name });
  };

  handleSubmit = async () => {
    const data = {
      location: this.state.location,
      category: this.state.category,
      verifiedStatus:
        this.state.verifiedStatus == "Not Verified"
          ? false
          : this.state.verifiedStatus == "Verified"
          ? true
          : undefined,
    };
    console.log(data);
    try {
      const results = await getSortedAssets(data);
      console.log(results);
    } catch (error) {
      console.log("Error");
    }
  };

  // getAuditorRemarkedAssets() {
  //   return this.state.auditorRemarksOnly.map((remark, counter) => {
  //     return (
  //       <Fragment>
  //         <p>
  //           {counter + 1}. Asset : {remark._id}
  //         </p>
  //       </Fragment>
  //     );
  //   });
  // }

  // getJuniorRemarkedAssets() {
  //   return this.state.juniorRemarksOnly.map((remark, counter) => {
  //     return (
  //       <Fragment>
  //         <p>
  //           {counter + 1}. Asset : {remark._id}
  //         </p>
  //       </Fragment>
  //     );
  //   });
  // }

  getLocationData() {
    return this.state.locationData.map((remark, counter) => {
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
    const { reportsData, verifiedOnly, locationData, loading } = this.state;
    if (loading) return <LoaderApp />;
    return (
      <Fragment>
        <Helmet>
          <title>Flookup | Home</title>
        </Helmet>
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <Paper className={classes.paper}>
                <SortByFields
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  locationData={locationData}
                  verifiedOnly={verifiedOnly}
                  reportsData={reportsData}
                />
              </Paper>
              <br />
              <br />
              <Paper className={classes.paper}>
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
                        <PieChart
                          data={verifiedOnly}
                          schemeColor={{ scheme: "accent" }}
                        />
                      </div>
                    </Grid>
                    <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Location wise
                      </Typography>
                      <div style={{ height: 300 }}>
                        <PieChart
                          data={locationData}
                          schemeColor={{ scheme: "nivo" }}
                        />
                      </div>
                    </Grid>
                    {/* <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Auditor remarked assets
                      </Typography>
                      <div style={{ height: 300 }}>
                        {this.getAuditorRemarkedAssets()}
                      </div>
                    </Grid> */}
                    {/* <Grid item lg={6}>
                      <Typography variant="h6" component="h6">
                        Junior remarked assets
                      </Typography>
                      <div style={{ height: 300 }}>
                        {this.getJuniorRemarkedAssets()}
                      </div>
                    </Grid> */}
                  </Grid>
                ) : (
                  <div>Upload some assets</div>
                )}
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AuditReport);
