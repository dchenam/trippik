import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Button, Alert } from "antd";
import { fetchPlaces } from "./actions";
import { addEvent } from "../TripPage/actions";
import PlaceTable from "./components/PlaceTable";
import Spinner from "../../components/Spinner";
import "./Place.css";

class PlaceList extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }

  render() {
    const {
      places: { data, error, isLoading },
      addEvent,
      push
    } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div>
        {error ? <Alert message={error.statusText} type="error" /> : null}
        <div className="place-list-table">
          <PlaceTable
            data={data.results}
            className="place-table"
            onAddEvent={item => {
              const event = { place: item.place_id, time: null };
              addEvent(event);
            }}
          />
          <Button type="primary" onClick={() => push("/places/new")}>
            New Place
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ places }) => ({
  places
});

export default connect(mapStateToProps, { fetchPlaces, addEvent, push })(
  PlaceList
);
