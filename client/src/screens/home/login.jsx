import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import jwtDecode from "jwt-decode";

import { login } from "services/auth";
import Form from "components/form/form";
import { connect } from "services/assetDbCall";
import Logo from "assets/images/brand/logo.png";
import Particles from "components/loginAnimation";
import InputField from "components/form/inputField";
import { Link } from "react-router-dom";
import GooglePlayIcon from "assets/images/brand/googlePlay.png";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    error: "",
  };

  onSubmit = async () => {
    const { data } = this.state;
    await login(data.email, data.password)
      .then(async (result) => {
        const { orgDatabase } = jwtDecode(result.data);
        await connect(orgDatabase)
          .then(() => {
            window.location = "/dashboard/";
          })
          .catch((err) => {
            this.setState({
              error: "Something failed! Contact Administrator.",
            });
          });
      })
      .catch((ex) => {
        this.setState({ error: ex.response.data.err });
        return null;
      });
  };

  render() {
    return (
      <Fragment>
        <Grid container direction="row">
          <Grid item xs={12} md={4} lg={3}>
            <Grid container direction="row" justify="center">
              <Grid item lg={10} xs={10}>
                <img className="login-brand-styles" src={Logo} alt={"Logo"} />
              </Grid>
              <Grid item lg={10} xs={10}>
                <Typography component="h1" variant="h5">
                  Log in to your account
                </Typography>
              </Grid>
              <Grid item lg={10} xs={10}>
                <form onSubmit={this.handleSubmit}>
                  <InputField
                    required
                    id="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    autoFocus={true}
                    onChange={this.handleOnChange}
                    type="email"
                    size="small"
                    margin="normal"
                  />
                  <InputField
                    required
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleOnChange}
                    size="small"
                    margin="normal"
                    error={this.state.error}
                  />
                  <Grid container direction="row" justify="space-between">
                    <Fragment>
                      <Grid item>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          style={{
                            backgroundColor: "#009933",
                            color: "white",
                          }}
                        >
                          Log In
                        </Button>
                      </Grid>
                      <Grid item>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "blue",
                          }}
                          to={"/forgotpassword"}
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                    </Fragment>
                  </Grid>
                </form>
              </Grid>
              <div style={{ bottom: 100, position: "absolute", flex: 1 }}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.flookup.fast&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  <img
                    src={GooglePlayIcon}
                    style={{ height: 75, width: 170 }}
                    alt={"Google Play Icon"}
                  />
                </a>
              </div>
              <div style={{ bottom: 20, position: "absolute", flex: 1 }}>
                <a
                  href="https://fixed-asset-flookup.s3.ap-south-1.amazonaws.com/privacy_policy_fastapp.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Privacy Policy
                </a>
              </div>
            </Grid>
          </Grid>
          <Grid item lg={9} md={8}>
            <div className="login-background">
              <Particles />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default Login;
