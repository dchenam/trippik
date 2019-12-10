import apiAction from '../../../utils/request';
import { FETCH_TRIPS_SUCCESS, FETCH_TRIPS_FAILURE } from '../constants';

export const fetchTrips = () =>
  apiAction({
    url: '/api/trips/',
    accessToken: localStorage.getItem('key'),
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_TRIPS_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_TRIPS_FAILURE, error });
    },
  });
