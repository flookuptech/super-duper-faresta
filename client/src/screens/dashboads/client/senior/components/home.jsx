import React, { Fragment, PureComponent } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid,
  Button
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { PieChart } from "components/charts/pie";
import {
  getReportsData,
  getReportsDataVerifiedOnly,
  getLocationData
} from "services/getReportsData";

import Date from 'components/datePicker';
import LoaderApp from "components/loaderApp";

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

class AuditReport extends PureComponent {
  state = {
    loading: true,
    reportsData: [],
    verifiedOnly: [],
    auditorRemarksOnly: [],
    juniorRemarksOnly: [],
    locationData: [], 
    startDate: "",
    endDate: ""
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
        loading: false
      });
    } catch (error) {}
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

  handleDateChange = ({target}) => {
    const name = this.state;
    name[target.name] = target.value;
    this.setState({name});
  };


  dateSubmit = async () => {
    try{
      console.log("Start Date" + this.state.startDate);
      console.log("End Date" + this.state.endDate);
    }
    catch{
      console.log("Error");
    }
  }

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
    const { reportsData, verifiedOnly, locationData, loading} = this.state;
    if (loading) return <LoaderApp />;
    return (
      <Fragment>
        <Helmet>
          <title>Flookup | Home</title>
        </Helmet>
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Box className={classes.boxBorder}>
                <Fragment>
                  <Typography component="h5" variant="h5">
                    Home
                  </Typography>
                </Fragment>
                <br />
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center" 
                >
                  <Grid item xs={12} md={3} lg={3}  style={{margin: 10}}>
                    <Date
                      name="startDate"
                      label="Start Date"
                      type="date"
                      selected={this.state.startDate}
                      onChange={this.handleDateChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3} style={{margin: 10}}>
                    <Date
                      name="endDate"
                      label="End Date"
                      type="date"
                      selected={this.state.endDate}
                      onChange={this.handleDateChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3} style={{margin: 10}}>
                    <Button
                      onClick={this.dateSubmit}
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: "#009933",
                        color: "white",
                        marginTop: 20
                      }}
                    >
                      Get Reports
                    </Button>
                  </Grid>
                </Grid>
                <br /><br />
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
