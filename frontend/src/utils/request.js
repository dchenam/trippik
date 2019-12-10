import { API } from '../services/constants';

export default function request({
  url = '',
  method = 'GET',
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = '',
  headers = null,
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headers,
    },
  };
}
