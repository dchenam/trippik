import { push } from "connected-react-router";
import request from "../../../utils/request";
import {
  ADD_EVENT,
  API_ERROR,
  DELETE_EVENT,
  UPDATE_EVENT,
  UPDATE_TRIP
} from "../constants";

export const addEvent = event => {
  const trip_id = localStorage.getItem("trip-token");
  return request({
    url: `/api/trips/${trip_id}/events/`,
    method: "POST",
    data: event,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: ADD_EVENT, payload: data });
      dispatch(push("/"));
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
};

export const deleteEvent = event => {
  const trip_id = localStorage.getItem("trip-token");
  return request({
    url: `/api/trips/${trip_id}/events/${event.event_id}/`,
    method: "DELETE",
    accessToken: localStorage.getItem("key"),
    onSuccess: (_data, dispatch) => {
      dispatch({ type: DELETE_EVENT, payload: event });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
};

export const updateEvent = (event, value) => {
  const trip_id = localStorage.getItem("trip-token");
  return request({
    url: `/api/trips/${trip_id}/events/${event.event_id}/`,
    method: "PATCH",
    data: value,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: UPDATE_EVENT, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
};

export const updateTrip = (trip, value) => {
  return request({
    url: `/api/trips/${trip.trip_id}/`,
    method: "PATCH",
    data: value,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: UPDATE_TRIP, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
};


export const saveTrip = trip =>
  request({
    url: `/api/trips/${trip.trip_id}/save/`,
    method: "POST",
    data: trip,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: UPDATE_TRIP, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
