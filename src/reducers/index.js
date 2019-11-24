import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import placesReducer from "../pages/place/reducers";
import TripReducer from "../pages/trip/editor/reducers";
import TripListReducer from "../pages/trip/list/reducers";
import authReducer from "./auth";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    places: placesReducer,
    trip: TripReducer,
    mytrips: TripListReducer
  });

export default createRootReducer;
