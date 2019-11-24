import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE,
  FETCH_PLACES_REQUEST,
  CREATE_PLACE_REQUEST,
  CREATE_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS,
  CREATE_PLACE_FAILURE,
  DELETE_PLACE_FAILURE
} from "./constants";

const initialState = {
  data: { results: [] },
  error: null,
  isLoading: true
};

export default function placesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLACES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_PLACES_SUCCESS:
      return { data: action.payload, error: null, isLoading: false };
    case FETCH_PLACES_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case CREATE_PLACE_REQUEST:
      return { ...state, isLoading: true };
    case CREATE_PLACE_SUCCESS:
      return {
        data: {
          ...state.data,
          results: [...state.data.results, action.payload]
        },
        error: null,
        isLoading: false
      };
    case CREATE_PLACE_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case DELETE_PLACE_SUCCESS:
      const filtered_data = state.data.results.filter(
        item => item.place_id !== Number(action.payload)
      );
      return {
        data: {
          ...state.data,
          results: filtered_data
        },
        error: null,
        isLoading: false
      };
    case DELETE_PLACE_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}
