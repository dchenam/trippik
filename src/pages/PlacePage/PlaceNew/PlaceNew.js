import React, { Component } from "react";
import PlaceForm from "./PlaceForm";

export default class PlaceNew extends Component {
  render() {
    return (
      <div className="place-form-container">
        <h5 style={{ alignSelf: "center" }}>Let's create a new place! </h5>
        <PlaceForm />
      </div>
    );
  }
}
