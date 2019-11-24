import {
  API_ERROR,
  ADD_EVENT,
  DELETE_EVENT,
  FETCH_TRIP_SUCCESS,
  FETCH_TRIP_FAILURE,
  UPDATE_EVENT,
  SET_CURRENT_TRIP,
  UPDATE_TRIP
} from "../constants";

const initialTripState = {
  data: {
    trip_id: localStorage.getItem("trip-token"),
    owner: null,
    events: [],
    summary: null
  },
  isLoading: true,
  error: null
};

export default function TripReducer(state = initialTripState, action) {
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
      localStorage.setItem("trip-token", action.payload);
      return { ...state, data: { ...state.data, trip_id: action.payload } };
    case UPDATE_TRIP:
      return { ...state, data: action.payload };
    case FETCH_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null
      };
    case FETCH_TRIP_FAILURE:
      localStorage.removeItem("trip-token");
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
