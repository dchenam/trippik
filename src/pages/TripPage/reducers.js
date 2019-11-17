import {
  ADD_EVENT,
  DELETE_EVENT,
  REORDER_TRIP,
  FETCH_TRIPS_REQUEST,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
  FETCH_TRIP_SUCCESS,
  FETCH_TRIP_FAILURE
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
        events: [...state.data.events, action.payload]
      };
      return { ...state, data };
    case DELETE_EVENT:
      const { event_id } = action.payload;
      const filtered_events = state.data.events.filter(
        item => item.event_id !== event_id
      );
      return { ...state, data: { ...state.data, events: filtered_events } };
    case REORDER_TRIP:
      return { ...state, events: action.payload };
    case FETCH_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case FETCH_TRIP_FAILURE:
      localStorage.removeItem("trip_id");
      return {
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
    case FETCH_TRIPS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_TRIPS_SUCCESS:
      return { trips: action.payload, isLoading: false };
    case FETCH_TRIPS_FAILURE:
      return { trips: [], isLoading: false, error: action.error };
    default:
      return state;
  }
}
