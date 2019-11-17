import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, Button, PageHeader } from "antd";
import PlaceTable from "../../components/Places/PlaceTable";
import { fetchPlaces } from "./actions";
import { addEvent } from "../TripPage/actions";
import "./Place.css";

class PlaceList extends Component {
  componentDidMount() {
    const { results } = this.props.places.data;
    const noPlaces = results.length === 0;
    if (noPlaces) this.props.fetchPlaces();
  }

  render() {
    const {
      places: { data, error, isLoading },
      history
    } = this.props;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <Spin />;
    }
    return (
      <div>
        <div className="place-list-header">
          <PageHeader
            ghost={false}
            onback={() => history.back()}
            title="Place List"
            subTitle="collection of places"
          ></PageHeader>
          <h5>Pick a Place</h5>
        </div>

        <div className="place-list-table">
          <PlaceTable
            data={data.results}
            className="place-table"
            onAddEvent={item => {
              const event = { place: item.place_id, time: null };
              this.props.addEvent(event, history);
            }}
          />
          <Button type="primary" onClick={() => history.push("/places/new")}>
            New Place
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ places, auth }) => ({
  places,
  auth
});

export default connect(mapStateToProps, { fetchPlaces, addEvent })(PlaceList);
