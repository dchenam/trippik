import request from "../../utils/request";
import { API_ERROR, DELETE_TRIP, SET_CURRENT_TRIP } from "./constants";

export const deleteTrip = trip => {
  return request({
    url: `/api/trips/${trip.trip_id}`,
    method: "DELETE",
    accessToken: localStorage.getItem("key"),
    onSuccess: (_data, dispatch, getState) => {
      dispatch({ type: DELETE_TRIP, payload: trip });
      const state = getState();
      if (state.trip.data.trip_id === trip.trip_id) {
        const { results } = state.mytrips.trips;
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
