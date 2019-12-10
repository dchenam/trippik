import { push } from 'connected-react-router';
import {
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE,
  CREATE_PLACE_SUCCESS,
  CREATE_PLACE_FAILURE,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_FAILURE,
} from './constants';

import request from '../../utils/request';

export const fetchPlaces = () =>
  request({
    url: '/api/places/',
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_PLACES_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_PLACES_FAILURE, error });
    },
  });

export const createPlace = values =>
  request({
    url: '/api/places/',
    method: 'POST',
    data: values,
    accessToken: localStorage.getItem('key'),
    onSuccess: (data, dispatch) => {
      dispatch({ type: CREATE_PLACE_SUCCESS, payload: data });
      dispatch(push('/places'));
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: CREATE_PLACE_FAILURE, error });
    },
  });

export const deletePlace = (id, history) =>
  request({
    url: `/api/places/${id}/`,
    method: 'DELETE',
    accessToken: localStorage.getItem('key'),
    onSuccess: (_data, dispatch) => {
      dispatch({ type: DELETE_PLACE_SUCCESS, payload: id });
      history.push('/places');
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: DELETE_PLACE_FAILURE, error });
    },
  });

export const searchPlace = ({ term, location }) =>
  request({
    url: '/api/places/',
    data: { search: `${term} ${location}` },
    accessToken: localStorage.getItem('key'),
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_PLACES_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: FETCH_PLACES_FAILURE, error });
    },
  });
