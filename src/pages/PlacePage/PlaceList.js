import React, { Component } from "react";
import { connect } from "react-redux";

import { Spin, Button, PageHeader } from "antd";
import PlaceTable from "../../components/Places/PlaceTable";
import { fetchPlaces } from "./actions";
import "./Place.css";

class PlaceList extends Component {
  componentDidMount() {
    const noPlaces = !this.props.places || this.props.places.data.length === 0;
    if (noPlaces) this.props.fetchPlaces();
  }

  render() {
    const { data, error, isLoading } = this.props.places;

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
            onback={() => window.history.back()}
            title="Place List"
            subTitle="collection of places"
          ></PageHeader>
          <h5>Pick a Place</h5>
        </div>

        <div className="place-list-table">
          <PlaceTable data={data.results} className="place-table" />
          <Button
            type="primary"
            onClick={() => this.props.history.push("/places/new")}
          >
            New Place
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchPlaces }
)(PlaceList);
