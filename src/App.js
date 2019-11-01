import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import * as actions from "./shared";

import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import PlaceDetail from "./pages/PlacePage/PlaceDetail";
import PlaceList from "./pages/PlacePage/PlaceList";
import PlaceNew from "./pages/PlacePage/PlaceNew";
import BasicLayout from "./components/BasicLayout";
import NormalLoginForm from "./pages/LoginPage/NormalLoginForm";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <BasicLayout>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/places" component={PlaceList} />
                <Route exact path="/places/new" component={PlaceNew} />
                <Route exact path="/places/:id" component={PlaceDetail} />
                <Route path="/account/login">
                  {isAuthenticated ? <Redirect to="/" /> : <NormalLoginForm />}
                </Route>
                <Route path="/account/register" component={NormalLoginForm} />
                <Redirect to="/" />
              </Switch>
            </BasicLayout>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  actions
)(App);
