import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTrips } from "./actions";
import { Tabs, Skeleton, Button } from "antd";
import TripTable from "../../components/Trips/TripTable";

class TripList extends Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  tabCallback() {
    console.log("tab changed");
  }

  renderTabs() {
    const { trips } = this.props.mytrips;
    return trips.results.map((trip, index) => {
      return (
        <Tabs.TabPane tab={`Tab ${index + 1}`} key={index}>
          <TripTable data={trip}></TripTable>
        </Tabs.TabPane>
      );
    });
  }

  createNewTrip = () => {
    localStorage.removeItem("trip_id");
    this.props.history.push("/");
  };

  render() {
    const { isLoading } = this.props.mytrips;
    if (isLoading) {
      return <Skeleton />;
    }
    return (
      <div>
        <Tabs defaultActiveKey="0" onChange={this.tabCallback}>
          {this.renderTabs()}
        </Tabs>
        <Button onClick={this.createNewTrip}>Create New Trip</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ mytrips }) => ({
  mytrips
});

export default connect(mapStateToProps, { fetchTrips })(TripList);
