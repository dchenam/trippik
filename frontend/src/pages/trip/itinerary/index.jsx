import React, { Component } from "react";
import { connect } from "react-redux";
import PageLoading from "../../../components/PageLoading";
import { fetchTrip } from "../actions";
import TripView from "../components/TripView";
import "./style.css";

class TripItinerary extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchTrip(id);
  }

  renderContent() {
    const { isLoading, data } = this.props.trip;
    if (isLoading) {
      return <PageLoading />;
    }
    return <TripView data={data} />;
  }
  render() {
    return (
      <div className="trip-itinerary-container">{this.renderContent()}</div>
    );
  }
}

const mapStateToProps = ({ trip }) => ({ trip });

export default connect(mapStateToProps, { fetchTrip })(TripItinerary);
