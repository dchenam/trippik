import { API_ERROR } from "../../../services/constants";
import { FETCH_PLACE_SUCCESS } from "./actions";

const initialState = {
  data: null,
  isLoading: true,
  error: null
};

export default function placeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLACE_SUCCESS:
      return { ...state, data: action.payload, isLoading: false, error: null };
    case API_ERROR:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
