import apiAction from "../../shared";

export const FETCH_PLACES_REQUEST = "fetch_request";
export const FETCH_PLACES_SUCCESS = "fetch_success";
export const FETCH_PLACES_FAILURE = "fetch_failure";

export const CREATE_PLACE_REQUEST = "create_request";
export const CREATE_PLACE_SUCCESS = "create_success";
export const CREATE_PLACE_FAILURE = "create_failure";

export const DELETE_PLACE_SUCCESS = "delete_success";
export const DELETE_PLACE_FAILURE = "delete_failure";

export const fetchPlaces = () =>
  apiAction({
    url: "/api/places/",
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_PLACES_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_PLACES_FAILURE, error: error });
    }
  });

export const createPlace = (values, history) =>
  apiAction({
    url: "/api/places/",
    method: "POST",
    data: values,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: CREATE_PLACE_SUCCESS, payload: data });
      history.push("/places");
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: CREATE_PLACE_FAILURE, error: error });
    }
  });

export const deletePlace = (id, history) =>
  apiAction({
    url: `/api/places/${id}`,
    method: "DELETE",
    accessToken: localStorage.getItem("key"),
    onSuccess: (_data, dispatch) => {
      dispatch({ type: DELETE_PLACE_SUCCESS, payload: id });
      history.push("/places");
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: DELETE_PLACE_FAILURE, error: error });
    }
  });
