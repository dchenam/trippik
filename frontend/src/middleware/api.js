import axios from 'axios';
import { push } from 'connected-react-router';
import { API, AUTHENTICATION_ERROR } from '../services/constants';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'undefined') return;
  next(action);
  if (action.type !== API) return;
  const { url, method, data, accessToken, onSuccess, onFailure, label, headers } = action.payload;

  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common.Authorization = accessToken ? `Token ${accessToken}` : null;

  if (label) {
    dispatch({ type: `${label}_REQUEST` });
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then(response => {
      onSuccess(response.data, dispatch, getState);
    })
    .catch(error => {
      onFailure(error.response, dispatch, getState);
      if (error.response && error.response.status === 401) {
        dispatch({ type: AUTHENTICATION_ERROR, error: error.response });
      }
      if (error.response && error.response.status === 404) {
        dispatch(push('/404'));
      }
    });
};

export default apiMiddleware;
