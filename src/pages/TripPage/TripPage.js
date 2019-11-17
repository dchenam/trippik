import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spin } from "antd";
import TripTable from "../../components/Trips/TripTable";
import { deleteEvent, fetchTrip } from "./actions";
import "./TripPage.css";

class TripPage extends Component {
  componentDidMount() {
    this.props.fetchTrip();
  }

  render() {
    const {
      trip: { isLoading, error, data },
      history
    } = this.props;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <Spin />;
    }
    return (
      <div className="trip-form-container">
        <h1 style={{ padding: "2rem" }}>Welcome to Trippik!</h1>
        <TripTable
          data={data}
          onDeleteEvent={event => this.props.deleteEvent(event)}
        />
        <Button type="primary" onClick={() => history.push("/places")}>
          Add a Place
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ trip }) => ({ trip });

const mapDispatchToProps = {
  deleteEvent,
  fetchTrip
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPage);
