import React, { Component } from "react";
import SearchForm from "./components/SearchForm";
import PlaceList from "./components/StandardTable";
import "./style.css";

export default class SearchPlace extends Component {
  render() {
    return (
      <div className="place-list-container">
        <div className="place-list-header">
          <h5>Pick a Place</h5>
        </div>
        <div className="place-search-bar">
          <SearchForm />
        </div>
        <PlaceList />
      </div>
    );
  }
}
