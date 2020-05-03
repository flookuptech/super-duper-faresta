import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid,
  Paper 
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getAllTenants } from "services/getUsers";
import TenantTable from "./tenantTable";
import { changeUserStatus } from "services/user/statusChange";

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
  },
  paper:{
    display: 'flex',
    flexDirection: "column",
    overflow: 'auto',
    padding: 32
  }
};

class UsersList extends Component {
  state = { tenantList: [] };

  async componentDidMount() {
    const { data: tenantList } = await getAllTenants();
    this.setState({ tenantList });
  }

  handleSwitchChange = async (e) => {
    const { tenantList } = this.state;
    const index = tenantList.findIndex((user) => user._id === e._id);
    tenantList[index].status = !tenantList[index].status;
    this.setState({ tenantList }, () => {
      this.changeUserStatus(e);
    });
  };

  changeUserStatus = async (user) => {
    try {
      const { data } = await changeUserStatus(user);
      toast.success(data.msg);
    } catch (error) {
      toast.error("Failed to change user status");
    }
  };

  render() {
    const { classes } = this.props;
    const { tenantList } = this.state;

    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <Grid>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper}>
              <Box className={classes.boxBorder}>
                  <div>
                    <Typography component="h5" variant="h5">
                      Users list
                    </Typography>
                    <br />
                    <Typography component="p" variant="p">
                      Total number of seniors/organizations:{" "}
                      <b>{tenantList.length}</b>
                    </Typography>
                    <br />
                  </div>
                  <React.Fragment>
                    <TenantTable tenantList={tenantList} handleChange={this.handleSwitchChange} />
                  </React.Fragment>
                  <br />
                </Box>
              </Paper>
              <br />
            </Container>
          </main>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UsersList);
