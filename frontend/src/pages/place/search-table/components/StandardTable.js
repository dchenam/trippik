import { Alert, Button, Card, message } from "antd";
import { push } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";
import PageLoading from "../../../../components/PageLoading";
import { addEvent } from "../../../trip/editor/actions";
import { fetchPlaces } from "../../actions";
import PlaceTable from "./PlaceTable";

class PlaceList extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }

  handleNewPlace = () => {
    const { push } = this.props;
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      push("/places/new");
    } else {
      message.warn("Please login first!");
    }
  };

  render() {
    const {
      places: { data, error, isLoading },
      addEvent
    } = this.props;

    if (isLoading) {
      return <PageLoading />;
    }

    return (
      <div>
        {error ? <Alert message={error.statusText} type="error" /> : null}
        <div className="place-list-table">
          <Card bordered={false}>
            <PlaceTable
              data={data.results}
              className="place-table"
              onAddEvent={item => {
                const event = { place: item.place_id, time: null };
                addEvent(event);
              }}
            />
            <Button type="primary" onClick={this.handleNewPlace}>
              New Place
            </Button>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, places }) => ({
  auth,
  places
});

export default connect(mapStateToProps, { fetchPlaces, addEvent, push })(
  PlaceList
);
