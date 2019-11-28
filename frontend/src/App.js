import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import BasicLayout from "./components/Layout/BasicLayout";
import PlaceForm from "./pages/place/form";
import PlaceProfile from "./pages/place/profile";
import SearchPlace from "./pages/place/search-table";
import TripPage from "./pages/trip/editor";
import TripList from "./pages/trip/list";
import Login from "./pages/user/login";
import Registration from "./pages/user/registration";
import { loadUser } from "./services/auth";



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
                <Route exact path="/places/new" component={PlaceForm} />
                <Route exact path="/places/:id" component={PlaceProfile} />
                <Route path="/user/login" component={Login} />
                <Route path="/user/register" component={Registration} />
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
