import { API_ERROR, DELETE_TRIP, SET_CURRENT_TRIP } from "./constants";
import request from "../../utils/request";

export const deleteTrip = trip => {
  return request({
    url: `/api/trips/${trip.trip_id}`,
    method: "DELETE",
    accessToken: localStorage.getItem("key"),
    onSuccess: (_data, dispatch) => {
      dispatch({ type: DELETE_TRIP, payload: trip });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
};

export const setCurrentTrip = trip => {
  return {
    type: SET_CURRENT_TRIP,
    payload: trip.trip_id
  };
};
