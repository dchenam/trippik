import { FETCH_PLACES_SUCCESS, FETCH_PLACES_FAILURE } from "./actions";

const initialState = {
  data: [],
  error: null,
  isLoading: true
};

export default function placesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { data: action.data, isLoading: false };
    case FETCH_PLACES_FAILURE:
      return { error: action.error, isLoading: false };
    default:
      return state;
  }
}
