import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spin, Icon, Divider, Alert } from "antd";

import TripTable from "./TripTable";
import TripEditModal from "./components/TripEditModal";

import { fetchTrip } from "./actions";

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

    if (isLoading) {
      return <Spin />;
    }
    
    return (
      <div className="trip-form-container">
        {error ? <Alert message={error.statusText} type="error" /> : null}
        <h1>Trip Builder</h1>
        <div className="trip-form-options">
          <Button onClick={() => history.push("/places")}>
            <Icon type="plus" />
            Add a Place
          </Button>
          <Divider type="vertical" />
          <TripEditModal trip={this.props.trip} />
        </div>
        <TripTable data={data} editable={true} />
      </div>
    );
  }
}

const mapStateToProps = ({ trip }) => ({
  trip
});

export default connect(mapStateToProps, { fetchTrip })(TripPage);