import React, { Component } from "react";
import TripList from "../../components/Trips/TripList";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ padding: "2rem" }}>Welcome to Trippik!</h1>
        <TripList></TripList>
      </div>
    );
  }
}
