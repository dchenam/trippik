import apiAction from "../../shared";

export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";

export const SET_CURRENT_TRIP = "SET_CURRENT_TRIP";
export const UPDATE_TRIP = "UPDATE_TRIP";
export const UPDATE_TRIP_FAILURE = "UPDATE_TRIP_FAILURE";
export const ERROR = "ERROR";
export const REORDER_TRIP = "reorder_trip";
export const FETCH_TRIPS_REQUEST = "fetch_trips";
export const FETCH_TRIPS_SUCCESS = "fetch_trips_success";
export const FETCH_TRIPS_FAILURE = "fetch_trips_failure";

export const FETCH_TRIP_SUCCESS = "fetch_trip_success";
export const FETCH_TRIP_FAILURE = "fetch_trip_failure";

export const addEvent = (event, history) => {
  const trip_id = localStorage.getItem("trip_id");
  return apiAction({
    url: `/api/trips/${trip_id}/events/`,
    method: "POST",
    data: event,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: ADD_EVENT, payload: data });
      history.push("/");
    },
    onFailure: error => {
      console.log(error.message);
    }
  });
};

export const deleteEvent = event => {
  const trip_id = localStorage.getItem("trip_id");
  return apiAction({
    url: `/api/trips/${trip_id}/events/${event.event_id}/`,
    method: "DELETE",
    accessToken: localStorage.getItem("key"),
    onSuccess: (_data, dispatch) => {
      dispatch({ type: DELETE_EVENT, payload: event });
    },
    onFailure: error => {
      console.log(error);
    }
  });
};

export const updateEvent = (event, value) => {
  const trip_id = localStorage.getItem("trip_id");
  return apiAction({
    url: `/api/trips/${trip_id}/events/${event.event_id}/`,
    method: "PATCH",
    data: value,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: UPDATE_EVENT, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: ERROR, error: error });
    }
  });
};

export const updateTrip = (trip, value) => {
  return apiAction({
    url: `/api/trips/${trip.trip_id}/`,
    method: "PATCH",
    data: value,
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: UPDATE_TRIP, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: ERROR, error: error });
    }
  });
};

export const setCurrentTrip = trip => {
  return {
    type: SET_CURRENT_TRIP,
    payload: trip.trip_id
  };
};

export const reorderTrip = trip => async dispatch => {
  dispatch({ type: REORDER_TRIP, payload: trip });
};

export const fetchTrips = () =>
  apiAction({
    url: "/api/trips/",
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_TRIPS_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_TRIPS_FAILURE, error: error });
    }
  });

export const fetchTrip = () => {
  const trip_id = localStorage.getItem("trip_id");
  const accessToken = localStorage.getItem("key");
  if (trip_id === null) {
    return apiAction({
      url: "/api/trips/new/",
      accessToken: accessToken,
      onSuccess: ({ id }, dispatch) => {
        localStorage.setItem("trip_id", id);
        dispatch(fetchTrip());
      }
    });
  }
  return apiAction({
    url: `/api/trips/${trip_id}`,
    accessToken: accessToken,
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_TRIP_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_TRIPS_FAILURE, error: error });
    }
  });
};
