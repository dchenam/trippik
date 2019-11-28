import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import placesReducer from "../pages/place/reducers";
import TripReducer from "../pages/trip/editor/reducers";
import TripListReducer from "../pages/trip/list/reducers";
import authReducer from "./auth";
import placeReducer from "../pages/place/profile/reducers";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    places: placesReducer,
    place: placeReducer,
    mytrips: TripListReducer,
    trip: TripReducer
  });

export default createRootReducer;
