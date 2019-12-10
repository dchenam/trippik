import React from 'react';
import SearchForm from './components/SearchForm';
import PlaceList from './components/StandardTable';
import './style.css';

const SearchPlace = () => (
  <>
    <div className="place-list-header">
      <h5>Pick a Place</h5>
      <div className="place-search-bar">
        <SearchForm />
      </div>
    </div>
    <div className="place-list-container">
      <PlaceList />
    </div>
  </>
);

export default SearchPlace;
