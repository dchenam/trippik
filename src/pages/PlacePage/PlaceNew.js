import React, { Component } from "react";
import PlaceForm from "./PlaceForm";
import "./Place.css";

export default class PlaceNew extends Component {
  state = { showPageReview: false };
  render() {
    if (this.state.showPageReview) {
      return <h1>Page Review</h1>;
    }
    return (
      <div className="place-form-container">
        <h5 style={{ alignSelf: "center" }}>Let's add a new place! </h5>
        <PlaceForm
          onFormSubmit={() => this.setState({ showPageReview: true })}
        />
      </div>
    );
  }
}
