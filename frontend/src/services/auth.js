import { push } from 'connected-react-router';
import { message } from 'antd';
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from './constants';
import request from '../utils/request';

export const loadUser = () =>
  request({
    url: '/api/accounts/user/',
    accessToken: localStorage.getItem('key'),
    onSuccess: (data, dispatch) => {
      dispatch({ type: USER_LOADED, user: data });
    },
  });

export const loginUser = (username, password, history, location) =>
  request({
    url: '/api/accounts/login/',
    method: 'POST',
    data: { username, password },
    onSuccess: (data, dispatch) => {
      const { state = {} } = location;
      const { prevLocation } = state;
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(loadUser());
      history.push(prevLocation || '/');
    },
    onFailure: (error, dispatch) => {
      Object.values(error.data).map(errorDetail => message.error(errorDetail, 5));
      dispatch({ type: LOGIN_FAILED });
    },
  });

export const logoutUser = () =>
  request({
    url: '/api/accounts/logout/',
    method: 'POST',
    onSuccess: (_data, dispatch) => {
      dispatch({ type: LOGOUT_SUCCESS, error: null });
    },
  });

export const registerUser = values =>
  request({
    url: '/api/accounts/registration/',
    method: 'POST',
    data: values,
    onSuccess: (data, dispatch) => {
      dispatch({ type: REGISTRATION_SUCCESS, payload: data });
      dispatch(loadUser());
      dispatch(push('/'));
    },
    onFailure: (error, dispatch) => {
      Object.values(error.data).map(errorDetail => message.error(errorDetail, 5));
      dispatch({ type: REGISTRATION_FAIL });
    },
  });
