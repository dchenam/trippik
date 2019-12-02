import request from "../../utils/request";
import {
  API_ERROR,
  DELETE_TRIP,
  FETCH_TRIP_FAILURE,
  FETCH_TRIP_SUCCESS,
  SET_CURRENT_TRIP
} from "./constants";

export const fetchTrip = trip_id => {
  const accessToken = localStorage.getItem("key");
  if (trip_id === null) {
    return createTrip();
  }
  return request({
    url: `/api/trips/${trip_id}/`,
    accessToken: accessToken,
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_TRIP_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_TRIP_FAILURE, error: error });
    }
  });
};

export const createTrip = () => {
  const accessToken = localStorage.getItem("key");
  return request({
    url: "/api/trips/",
    method: "POST",
    data: {},
    accessToken: accessToken,
    onSuccess: ({ trip_id }, dispatch) => {
      localStorage.setItem("trip-token", trip_id);
      dispatch({ type: SET_CURRENT_TRIP, payload: trip_id });
      dispatch(fetchTrip(trip_id));
    }
  });
};

export const deleteTrip = trip => {
  return request({
    url: `/api/trips/${trip.trip_id}/`,
    method: "DELETE",
    accessToken: localStorage.getItem("key"),
    onSuccess: (_data, dispatch, getState) => {
      dispatch({ type: DELETE_TRIP, payload: trip });
      const state = getState();
      if (state.editTrip.data.trip_id === trip.trip_id) {
        const { results } = state.userTrips.trips;
        if (results.length === 0) {
          localStorage.removeItem("trip-token");
        } else {
          dispatch(setCurrentTrip(results[results.length - 1]));
        }
      }
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
};

export const setCurrentTrip = ({ trip_id }) => {
  localStorage.setItem("trip-token", trip_id);
  return {
    type: SET_CURRENT_TRIP,
    payload: trip_id
  };
};
