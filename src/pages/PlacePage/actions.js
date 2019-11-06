import Axios from "axios";

export const FETCH_PLACES_REQUEST = "fetch_request";
export const FETCH_PLACES_SUCCESS = "fetch_success";
export const FETCH_PLACES_FAILURE = "fetch_failure";

export const CREATE_PLACE_REQUEST = "create_request";
export const CREATE_PLACE_SUCCESS = "create_success";
export const CREATE_PLACE_FAILURE = "create_failure";

export const DELETE_PLACE_SUCCESS = "delete_success";
export const UNAUTHORIZED_ERROR = "unauthorized error";

export const fetchPlaces = () => async dispatch => {
  try {
    const res = await Axios.get("/api/places/");
    dispatch({ type: FETCH_PLACES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_PLACES_FAILURE, error: error });
  }
};

export const createPlace = (values, history) => async dispatch => {
  try {
    const token = localStorage.getItem("key");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    const res = await Axios.post("/api/places/", JSON.stringify(values), {
      headers: headers
    });
    if (res.status === 201) {
      history.push("/places");
      dispatch({ type: CREATE_PLACE_SUCCESS, payload: res.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePlace = (id, history) => async dispatch => {
  try {
    const token = localStorage.getItem("key");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    const res = await Axios.delete(`/api/places/${id}`, {
      headers: headers
    });
    if (res.status === 204) {
      history.push("/places");
      dispatch({ type: DELETE_PLACE_SUCCESS, payload: id });
    }
  } catch (error) {
    dispatch({ type: UNAUTHORIZED_ERROR, error: error });
  }
};
