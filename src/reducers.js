import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import placesReducer from "./pages/PlacePage/reducers";
import authReducer from "./shared/auth/reducers";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    places: placesReducer
  });

export default createRootReducer;
