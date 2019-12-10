import {
  FETCH_TRIPS_REQUEST,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
  DELETE_TRIP,
  SET_CURRENT_TRIP,
} from '../constants';

const initialState = {
  trips: [],
  isLoading: true,
  error: null,
};

export default function tripListReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_TRIP:
      return {
        ...state,
        trips: {
          ...state.trips,
          results: state.trips.results.filter(item => item.tripId !== action.payload.tripId),
        },
        error: null,
      };
    case SET_CURRENT_TRIP:
      return { ...state, currentTrip: action.payload };
    case FETCH_TRIPS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_TRIPS_SUCCESS:
      return { trips: action.payload, isLoading: false, error: null };
    case FETCH_TRIPS_FAILURE:
      return { trips: [], isLoading: false, error: action.error };
    default:
      return state;
  }
}
