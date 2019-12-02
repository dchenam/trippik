import { Alert, Button, Card, Icon, Result, Skeleton, Tabs } from "antd";
import { push } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTrip, setCurrentTrip } from "../actions";
import TripView from "../components/TripView";
import { fetchTrips } from "./actions";
import "./style.css";

class TripList extends Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  handleNewTrip = () => {
    localStorage.removeItem("trip-token");
    this.props.history.push("/");
  };

  handleEdit = trip => {
    this.props.setCurrentTrip(trip);
    this.props.push("/");
  };

  handleDelete = trip => {
    this.props.deleteTrip(trip);
  };

  renderTabs() {
    const { trips } = this.props.trips;
    return trips.results.map((trip, index) => {
      const tabText = trip.name === "" ? `Trip ${index + 1}` : trip.name;
      return (
        <Tabs.TabPane tab={tabText} key={index}>
          <div className="trip-list-options">
            <Button.Group>
              <Button onClick={() => this.handleEdit(trip)}>
                <Icon type="edit" />
                Edit
              </Button>
              <Button onClick={() => this.handleDelete(trip)}>Delete</Button>
            </Button.Group>
          </div>
          <TripView data={trip} />
        </Tabs.TabPane>
      );
    });
  }

  renderContent() {
    const { isLoading, trips } = this.props.trips;
    if (isLoading) {
      return <Skeleton />;
    }
    if (!trips.results || trips.results.length === 0) {
      return (
        <Result
          title="You have no trips"
          extra={
            <Button type="primary" onClick={this.handleNewTrip}>
              Create a New Trip
            </Button>
          }
        />
      );
    }
    return (
      <Card bordered={false}>
        <Tabs
          defaultActiveKey="0"
          onChange={this.tabCallback}
          tabPosition="left"
        >
          {this.renderTabs()}
        </Tabs>
      </Card>
    );
  }

  render() {
    const { error } = this.props.trips;
    return (
      <>
        <h5 className="trip-list-header">My Trips</h5>
        <div className="trip-list-container">
          {error ? <Alert message={error.statusText} type="error" /> : null}
          {this.renderContent()}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ userTrips }) => ({
  trips: userTrips
});

export default connect(mapStateToProps, {
  fetchTrips,
  deleteTrip,
  setCurrentTrip,
  push
})(TripList);
