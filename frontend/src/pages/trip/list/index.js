import { Alert, Button, Card, Result, Skeleton, Tabs } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTrips } from "./actions";
import TripView from "./components/TripView";
import "./style.css";

class TripList extends Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  handleNewTrip = () => {
    localStorage.removeItem("trip-token");
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

  renderContent() {
    const { isLoading, trips } = this.props.mytrips;
    if (isLoading) {
      return <Skeleton />;
    }
    if (trips.results.length === 0) {
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
    const { error } = this.props.mytrips;
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

const mapStateToProps = ({ mytrips }) => ({
  mytrips
});

export default connect(mapStateToProps, { fetchTrips })(TripList);
