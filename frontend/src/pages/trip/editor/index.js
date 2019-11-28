import { Alert, Button, Card, Descriptions, Icon, message } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import PageLoading from "../../../components/PageLoading";
import TripEditModal from "../components/TripEditModal";
import TripTable from "../components/TripTable";
import { fetchTrip, saveTrip } from "./actions";
import "./style.css";



class TripPage extends Component {
  componentDidMount() {
    this.props.fetchTrip();
  }

  handleNewTrip = () => {
    localStorage.removeItem("trip-token");
    this.props.fetchTrip();
  };

  handleSaveTrip = data => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.saveTrip(data);
    } else {
      message.warn("Please login first!");
    }
  };

  renderContent() {
    const { trip, history } = this.props;
    const { isLoading, data } = trip;
    const { name, summary, date, owner } = data;
    if (isLoading) {
      return <PageLoading />;
    }
    return (
      <>
        <Card style={{ marginBottom: 24 }} bordered={false}>
          <Button.Group className="trip-editor-options">
            <Button onClick={this.handleNewTrip}>Start New</Button>
            <TripEditModal data={data} />
            {owner === null ? (
              <Button onClick={() => this.handleSaveTrip(data)}>Save</Button>
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
          </Button.Group>
          <Descriptions title="Trip Info">
            <Descriptions.Item label="Name">{name}</Descriptions.Item>
            <Descriptions.Item label="Summary">{summary}</Descriptions.Item>
            <Descriptions.Item label="Date">
              {date ? moment(date).format("MMM DD, YYYY") : null}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false}>
          <TripTable data={data} editable={true} />
          <Button
            type="primary"
            style={{ marginTop: 24 }}
            onClick={() => history.push("/places")}
          >
            <Icon type="plus" />
            Add a Place
          </Button>
        </Card>
      </>
    );
  }

  render() {
    const {
      trip: { error }
    } = this.props;

    return (
      <>
        <h5 className="trip-editor-header">Trip Builder</h5>
        <div className="trip-editor-container">
          {error ? <Alert message={error.statusText} type="error" /> : null}
          {this.renderContent()}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ trip, auth }) => ({
  trip,
  auth
});

export default connect(mapStateToProps, { fetchTrip, saveTrip })(TripPage);
