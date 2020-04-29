import React, { Component, Fragment } from "react";
import {
  Typography,
  Container,
  Box,
  withStyles,
  Grid,
  Paper,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getUsers } from "services/getUsers";
import UserListTable from "./userList/userListTable";
import LoaderApp from "components/loaderApp";
import { changeUserStatus } from "services/user/statusChange";
const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "20px",
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

class UsersList extends Component {
  state = { userList: [], loading: true };

  async componentDidMount() {
    const db = this.props.user.orgDatabase;
    const { data: userList } = await getUsers(db);
    this.setState({ userList, loading: false });
  }

  handleSwitchChange = async (e) => {
    const { userList } = this.state;
    const index = userList.findIndex((user) => user._id === e._id);
    userList[index].status = !userList[index].status;
    this.setState({ userList }, () => {
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
    const { userList, loading } = this.state;
    if (loading) return <LoaderApp />;

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
                      Total number of users: <b>{userList.length}</b>
                    </Typography>
                    <br />
                  </div>
                  <Fragment>
                    <UserListTable
                      userList={userList}
                      handleChange={this.handleSwitchChange}
                    />
                  </Fragment>
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
