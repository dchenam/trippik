import { FETCH_TRIP_SUCCESS, API_ERROR } from "../constants";

const initialState = {
  data: null,
  isLoading: true,
  error: null
};

export default function tripItineraryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIP_SUCCESS:
      return { data: action.payload, isLoading: false, error: null };
    case API_ERROR:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
