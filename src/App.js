import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { loadUser } from "./shared/auth/actions";

import TripPage from "./pages/TripPage/TripPage";
import PlaceDetail from "./pages/PlacePage/PlaceDetail";
import PlaceNew from "./pages/PlacePage/PlaceNew/PlaceNew";
import BasicLayout from "./components/Layout/BasicLayout";
import TripList from "./pages/TripPage/TripList";

import "./App.css";
import SearchPlace from "./pages/PlacePage/SearchPlace";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function PrivateRoute({ component: Comp, isAuthenticated, path, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/account/login",
              state: { prevLocation: path },
              error: "You need to login first!"
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  componentDidMount() {
    if (this.props.auth.key) {
      this.props.loadUser();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <header className="App-header">
          <>
            <BasicLayout>
              <Switch>
                <Route exact path="/" component={TripPage} />
                <PrivateRoute
                  path="/trips"
                  isAuthenticated={isAuthenticated}
                  component={TripList}
                />
                <Route exact path="/places" component={SearchPlace} />
                <Route exact path="/places/new" component={PlaceNew} />
                <Route exact path="/places/:id" component={PlaceDetail} />
                <Route path="/account/login" component={LoginPage} />
                <Route path="/account/register" component={RegistrationPage} />
                <Redirect to="/" />
              </Switch>
            </BasicLayout>
          </>
        </header>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { loadUser })(App);
