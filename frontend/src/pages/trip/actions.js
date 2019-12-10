/* eslint-disable no-use-before-define */
import request from '../../utils/request';
import {
  API_ERROR,
  DELETE_TRIP,
  FETCH_TRIP_FAILURE,
  FETCH_TRIP_SUCCESS,
  SET_CURRENT_TRIP,
} from './constants';

export const createTrip = () => {
  const accessToken = localStorage.getItem('key');
  return request({
    url: '/api/trips/',
    method: 'POST',
    data: {},
    accessToken,
    onSuccess: ({ tripId }, dispatch) => {
      localStorage.setItem('trip-token', tripId);
      dispatch({ type: SET_CURRENT_TRIP, payload: tripId });
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(fetchTrip(tripId));
    },
  });
};

export const fetchTrip = tripId => {
  const accessToken = localStorage.getItem('key');
  if (tripId === null) {
    return createTrip();
  }
  return request({
    url: `/api/trips/${tripId}/`,
    accessToken,
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_TRIP_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_TRIP_FAILURE, error });
    },
  });
};

export const setCurrentTrip = ({ tripId }) => {
  localStorage.setItem('trip-token', tripId);
  return {
    type: SET_CURRENT_TRIP,
    payload: tripId,
  };
};

export const deleteTrip = trip =>
  request({
    url: `/api/trips/${trip.tripId}/`,
    method: 'DELETE',
    accessToken: localStorage.getItem('key'),
    onSuccess: (_data, dispatch, getState) => {
      dispatch({ type: DELETE_TRIP, payload: trip });
      const state = getState();
      if (state.editTrip.data.tripId === trip.tripId) {
        const { results } = state.userTrips.trips;
        if (results.length === 0) {
          localStorage.removeItem('trip-token');
        } else {
          dispatch(setCurrentTrip(results[results.length - 1]));
        }
      }
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error });
    },
  });
