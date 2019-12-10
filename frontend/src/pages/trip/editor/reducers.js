import {
  ADD_EVENT,
  API_ERROR,
  DELETE_EVENT,
  FETCH_TRIP_FAILURE,
  FETCH_TRIP_SUCCESS,
  SET_CURRENT_TRIP,
  UPDATE_EVENT,
  UPDATE_TRIP,
} from '../constants';

const initialTripState = {
  data: {
    tripId: localStorage.getItem('trip-token'),
    owner: null,
    events: [],
    summary: null,
  },
  isLoading: true,
  error: null,
};

export default function tripEditorReducer(state = initialTripState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        data: {
          ...state.data,
          events: [...state.data.events, action.payload],
          error: null,
        },
      };
    case DELETE_EVENT:
      return {
        ...state,
        data: {
          ...state.data,
          events: state.data.events.filter(item => item.eventId !== action.payload.eventId),
        },
        error: null,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        data: {
          ...state.data,
          events: state.data.events.map(item => {
            if (item.eventId === action.payload.eventId) {
              const newItem = Object.assign({}, item);
              newItem.time = action.payload.time;
              return newItem;
            }
            return item;
          }),
        },
        error: null,
      };
    case SET_CURRENT_TRIP:
      return {
        ...state,
        data: { ...state.data, tripId: action.payload },
        error: null,
      };
    case UPDATE_TRIP:
      return { ...state, data: action.payload, error: null };
    case FETCH_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_TRIP_FAILURE:
      localStorage.removeItem('trip-token');
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case API_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
