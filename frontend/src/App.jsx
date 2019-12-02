import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import BasicLayout from "./components/Layout/BasicLayout";
import PlaceForm from "./pages/place/form";
import PlaceProfile from "./pages/place/profile";
import SearchPlace from "./pages/place/search-table";
import TripEditor from "./pages/trip/editor";
import TripList from "./pages/trip/list";
import TripItinerary from "./pages/trip/itinerary";
import Login from "./pages/user/login";
import Registration from "./pages/user/registration";
import NoFoundPage from "./pages/404";
import { loadUser } from "./services/auth";
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
              pathname: "/user/login",
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
                <Route exact path="/" component={TripEditor} />
                <PrivateRoute
                  exact
                  path="/trips"
                  isAuthenticated={isAuthenticated}
                  component={TripList}
                />
                <Route exact path="/trips/:id" component={TripItinerary} />
                <Route exact path="/places" component={SearchPlace} />
                <Route exact path="/places/new" component={PlaceForm} />
                <Route exact path="/places/:id" component={PlaceProfile} />
                <Route path="/user/login" component={Login} />
                <Route path="/user/register" component={Registration} />
                <Route path="/404" component={NoFoundPage} />
                <Redirect to="/404" />
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
