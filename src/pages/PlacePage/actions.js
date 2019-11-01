import Axios from "axios";

export const FETCH_PLACES_REQUEST = "fetch_request";
export const FETCH_PLACES_SUCCESS = "fetch_success";
export const FETCH_PLACES_FAILURE = "fetch_failure";

export const fetchPlaces = () => async dispatch => {
  try {
    const res = await Axios.get("/api/places/");
    dispatch({ type: FETCH_PLACES_SUCCESS, data: res.data });
  } catch (error) {
    dispatch({ type: FETCH_PLACES_FAILURE, error: error });
  }
};
