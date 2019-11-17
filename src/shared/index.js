import { loadUser, loginUser, logoutUser } from "./auth/actions";

export { loadUser, loginUser, logoutUser };

export const API = "API";

export default function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headers = null
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
      headers
    }
  };
}
