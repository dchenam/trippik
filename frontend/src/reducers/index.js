import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import placesReducer from "../pages/place/reducers";
import tripEditorReducer from "../pages/trip/editor/reducers";
import tripListReducer from "../pages/trip/list/reducers";
import tripItineraryReducer from "../pages/trip/itinerary/reducers";
import authReducer from "./auth";
import placeReducer from "../pages/place/profile/reducers";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    places: placesReducer,
    place: placeReducer,
    userTrips: tripListReducer,
    editTrip: tripEditorReducer,
    trip: tripItineraryReducer
  });

export default createRootReducer;
