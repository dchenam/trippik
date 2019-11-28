import { push } from "connected-react-router";
import request from "../../../utils/request";
import {
  ADD_EVENT,
  API_ERROR,
  DELETE_EVENT,
  FETCH_TRIP_FAILURE,
  FETCH_TRIP_SUCCESS,
  SET_CURRENT_TRIP,
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

export const fetchTrip = () => {
  const trip_id = localStorage.getItem("trip-token");
  const accessToken = localStorage.getItem("key");
  if (trip_id === null) {
    return request({
      url: "/api/trips/",
      method: "POST",
      data: {},
      accessToken: accessToken,
      onSuccess: ({ trip_id }, dispatch) => {
        localStorage.setItem("trip-token", trip_id);
        dispatch({ type: SET_CURRENT_TRIP, payload: trip_id });
        dispatch(fetchTrip());
      }
    });
  }
  return request({
    url: `/api/trips/${trip_id}`,
    accessToken: accessToken,
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_TRIP_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_TRIP_FAILURE, error: error });
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
