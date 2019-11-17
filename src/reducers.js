import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import placesReducer from "./pages/PlacePage/reducers";
import authReducer from "./shared/auth/reducers";
import { TripReducer, MyTripListReducer } from "./pages/TripPage/reducers";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    places: placesReducer,
    trip: TripReducer,
    mytrips: MyTripListReducer
  });

export default createRootReducer;
