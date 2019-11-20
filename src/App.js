import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { loadUser } from "./shared/auth/actions";

import TripPage from "./pages/TripPage/TripPage";
import PlaceDetail from "./pages/PlacePage/PlaceDetail";
import PlaceList from "./pages/PlacePage/PlaceList";
import PlaceNew from "./pages/PlacePage/PlaceNew";
import BasicLayout from "./components/Layout/BasicLayout";
import NormalLoginForm from "./pages/LoginPage/NormalLoginForm";
import TripList from "./pages/TripPage/TripList";
import TripNew from "./pages/TripPage/TripNew";
import "./App.css";

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
    this.props.loadUser();
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
                <Route exact path="/trips/new" component={TripNew} />
                <Route exact path="/places" component={PlaceList} />
                <Route exact path="/places/new" component={PlaceNew} />
                <Route exact path="/places/:id" component={PlaceDetail} />
                <Route path="/account/login" component={NormalLoginForm} />
                <Route path="/account/register" component={NormalLoginForm} />
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
