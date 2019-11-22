import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTrips, setCurrentTrip } from "./actions";
import { Tabs, Skeleton, Button, Alert } from "antd";
import TripView from "./TripView";

class TripList extends Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  handleNewTrip = () => {
    localStorage.removeItem("trip_id");
    this.props.history.push("/");
  };

  renderTabs() {
    const { trips } = this.props.mytrips;
    return trips.results.map((trip, index) => {
      const tabText = trip.name === "" ? `Trip ${index + 1}` : trip.name;
      return (
        <Tabs.TabPane tab={tabText} key={index}>
          <TripView data={trip} />
        </Tabs.TabPane>
      );
    });
  }

  render() {
    const { isLoading, error } = this.props.mytrips;
    if (isLoading) {
      return <Skeleton />;
    }
    return (
      <div className="trip-list-container">
        {error ? <Alert message={error.statusText} type="error" /> : null}
        <Tabs defaultActiveKey="0" onChange={this.tabCallback}>
          {this.renderTabs()}
        </Tabs>
        <Button onClick={this.handleNewTrip}>Create New Trip</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ mytrips }) => ({
  mytrips
});

export default connect(mapStateToProps, { fetchTrips, setCurrentTrip })(
  TripList
);
