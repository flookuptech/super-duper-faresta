// Packages
import React, { Component, Fragment, Suspense, lazy } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import "assets/css/formstyles.css";
import "assets/css/loginstyles.css";

// Local imports
// Services
import { getCurrentUser } from "./services/auth";

//Components
import RootUserDashboard from "screens/dashboads/root/adminDashBoard";
import AuditorDashboard from "screens/dashboads/client/auditor/auditorDs";
import SeniorUserDashboard from "screens/dashboads/client/senior/seniorUserDs";
import JuniorUserDashboard from "screens/dashboads/client/junior/juniorUserDs";
import ForgotPassword from "screens/home/forgotPassword";
//APPLoader
import LoaderApp from "./components/loaderApp";
const Login = lazy(() => import("./screens/home/login"));
const Logout = lazy(() => import("./components/logout"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      role: ""
    };
  }

  UNSAFE_componentWillMount() {
    try {
      const user = getCurrentUser();
      if (user !== null) this.setState({ user, role: user.role });
    } catch (error) {
      return null;
    }
  }

  render() {
    const { user } = this.state;

    return (
      <Fragment>
        <div className="App">
          <Router>
            <Suspense fallback={<LoaderApp />}>
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route exact path="/" component={Login} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route
                  path="/dashboard/"
                  render={props => {
                    if (!user) return <Redirect exact to="/" />;
                    if (user.role === "root")
                      return (
                        <RootUserDashboard
                          roleValue={this.state.user.role}
                          user={this.state.user}
                          {...props}
                        />
                      );
                    if (user.role === "junior")
                      return (
                        <JuniorUserDashboard
                          roleValue={this.state.user.role}
                          user={this.state.user}
                          {...props}
                        />
                      );
                    if (user.role === "senior")
                      return (
                        <SeniorUserDashboard
                          roleValue={this.state.user.role}
                          user={this.state.user}
                          {...props}
                        />
                      );
                    if (user.role === "auditor")
                      return (
                        <AuditorDashboard
                          roleValue={this.state.user.role}
                          user={this.state.user}
                          {...props}
                        />
                      );
                  }}
                />
              </Switch>
            </Suspense>
          </Router>
        </div>
      </Fragment>
    );
  }
}

export default App;
