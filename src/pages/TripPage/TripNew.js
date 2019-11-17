import React, { Component } from "react";
import { connect } from "react-redux";

class TripNew extends Component {
  render() {
    return (
      <div>
        <h1>New Trip</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripNew);
