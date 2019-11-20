import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, Button, PageHeader, Alert } from "antd";
import { fetchPlaces } from "./actions";
import { addEvent } from "../TripPage/actions";
import PlaceTable from "../../components/Places/PlaceTable";
import "./Place.css";
import SearchForm from "../../components/Places/SearchForm";

class PlaceList extends Component {
  componentDidMount() {
    this.props.fetchPlaces();
  }

  render() {
    const {
      places: { data, error, isLoading },
      history
    } = this.props;

    if (isLoading) {
      return <Spin />;
    }

    return (
      <div>
        {error ? <Alert message={error.statusText} type="error" /> : null}

        <div className="place-list-header">
          <PageHeader
            ghost={false}
            onback={() => history.back()}
            title="Place List"
            subTitle="collection of places"
          ></PageHeader>
          <h5>Pick a Place</h5>
        </div>

        <div className="place-search-bar">
          <SearchForm />
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
