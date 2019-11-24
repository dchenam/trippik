import { Alert, Button, Descriptions, Divider, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import TripTable from "../components/TripTable";
import TripEditModal from "../components/TripEditModal";
import PageLoading from "../../../components/PageLoading";

import { fetchTrip, saveTrip } from "./actions";
import "./style.css";

class TripPage extends Component {
  componentDidMount() {
    this.props.fetchTrip();
  }
  renderContent() {
    const { trip, history, saveTrip } = this.props;
    const { isLoading, data } = trip;
    const { name, summary, date, owner } = data;
    if (isLoading) {
      return <PageLoading />;
    }
    return (
      <>
        <h5 style={{ textAlign: "center" }}>Trip Builder</h5>
        <div className="trip-form-options">
          <Button onClick={() => history.push("/places")}>
            <Icon type="plus" />
            Add a Place
          </Button>
          <Divider type="vertical" />
          <TripEditModal data={data} />
          <Divider type="vertical" />
          {owner === null ? (
            <Button onClick={() => saveTrip(data)}>Save</Button>
          ) : (
            <Button>
              <Icon
                type="check-circle"
                theme="twoTone"
                twoToneColor="#52c41a"
              />
              Saved
            </Button>
          )}
        </div>
        <Descriptions title="Trip Info">
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Summary">{summary}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {date ? moment(date).format("MMM DD, YYYY") : null}
          </Descriptions.Item>
        </Descriptions>
        <TripTable data={data} editable={true} />
      </>
    );
  }

  render() {
    const {
      trip: { error }
    } = this.props;

    return (
      <div className="trip-form-container">
        {error ? <Alert message={error.statusText} type="error" /> : null}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ trip }) => ({
  trip
});

export default connect(mapStateToProps, { fetchTrip, saveTrip })(TripPage);
