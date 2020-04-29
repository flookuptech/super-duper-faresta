import React, { Fragment } from "react";
import {
  Typography,
  Box,
  withStyles,
  Container,
  Paper,
} from "@material-ui/core";

import UserDataFields from "./userDataFields";
import Form from "components/form/form";
import { createUser } from "services/createUserSenior";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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

class AddUsers extends Form {
  state = {
    data: {
      name: "",
      email: "",
      role: "",
      designation: "",
      contact: "",
    },
    companyName: "",
    registeredBy: "",
  };

  UNSAFE_componentWillMount() {
    const { user } = this.props;
    const companyName = user.companyName;
    const currentUser = user.name;
    this.setState({ companyName, registeredBy: currentUser });
  }

  onSubmit = async () => {
    const data = {
      ...this.state.data,
      userType: "client",
      companyName: this.state.companyName,
      registeredBy: this.state.registeredBy,
    };
    if (data["role"] === "")
      return alert("Role cannot be empty. Please assign a role");
    else {
      try {
        const result = await createUser(data);
        if (result.status === 200) toast.success(result.data.res);
      } catch (error) {
        const { data } = error.response;
        toast.error(data.err);
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <div>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper}>
                <Box className={classes.boxBorder}>
                  <div>
                    <Typography component="h5" variant="h5">
                      Register Users
                    </Typography>
                  </div>
                  <br />
                  <div>
                    <UserDataFields
                      onSubmit={this.handleSubmit}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </Box>
              </Paper>
              <br />
            </Container>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AddUsers);
