import {
  ADD_EVENT,
  DELETE_EVENT,
  DELETE_TRIP,
  FETCH_TRIPS_REQUEST,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
  FETCH_TRIP_SUCCESS,
  FETCH_TRIP_FAILURE,
  UPDATE_EVENT,
  SET_CURRENT_TRIP,
  API_ERROR
} from "./actions";

const initialTripState = {
  data: {
    trip_id: localStorage.getItem("trip_id"),
    owner: null,
    events: [],
    summary: null
  },
  isLoading: true,
  error: null
};

export function TripReducer(state = initialTripState, action) {
  switch (action.type) {
    case ADD_EVENT:
      const data = {
        ...state.data,
        events: [...state.data.events, action.payload],
        error: null
      };
      return { ...state, data };
    case DELETE_EVENT:
      const filtered_events = state.data.events.filter(
        item => item.event_id !== action.payload.event_id
      );
      return {
        ...state,
        data: { ...state.data, events: filtered_events },
        error: null
      };
    case UPDATE_EVENT:
      const modified_events = state.data.events.map(item => {
        if (item.event_id === action.payload.event_id) {
          item.time = action.payload.time;
        }
        return item;
      });
      return {
        ...state,
        data: { ...state.data, events: modified_events },
        error: null
      };
    case SET_CURRENT_TRIP:
      localStorage.setItem("trip_id", action.payload);
      return { ...state, data: { ...state.data, trip_id: action.payload } };
    case FETCH_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null
      };
    case FETCH_TRIP_FAILURE:
      localStorage.removeItem("trip_id");
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case API_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}

const initialTripsState = {
  trips: [],
  isLoading: true,
  error: null
};

export function MyTripListReducer(state = initialTripsState, action) {
  switch (action.type) {
    case DELETE_TRIP:
      const filtered_trips = state.trips.results.filter(
        item => item.trip_id !== action.payload.trip_id
      );
      return {
        ...state,
        trips: { ...state.trips, results: filtered_trips },
        error: null
      };
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
