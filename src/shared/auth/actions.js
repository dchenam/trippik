import Axios from "axios";

export const USER_LOADING = "user_loading";
export const USER_LOADED = "user_loaded";
export const AUTHENTICATION_ERROR = "authentication_error";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILED = "login_failed";
export const LOGOUT_SUCCESS = "logout_success";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const token = getState().auth.key;
  let headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  try {
    const res = await Axios.get("/api/accounts/user/", { headers: headers });
    if (res.status === 200) {
      dispatch({ type: USER_LOADED, user: res.data });
    }
  } catch (error) {
    console.log("error");
    dispatch({ type: AUTHENTICATION_ERROR, error: error });
  }
};

export const loginUser = (username, password) => async (dispatch, getState) => {
  let headers = {
    "Content-Type": "application/json"
  };
  let body = JSON.stringify({ username, password });
  try {
    const res = await Axios.post("/api/accounts/login/", body, {
      headers: headers
    });
    if (res.status === 200) {
      dispatch({ type: LOGIN_SUCCESS, data: res.data });
    } else if (res.status === 403 || res.status === 401) {
      dispatch({ type: AUTHENTICATION_ERROR, data: res.data });
    } else {
      dispatch({ type: LOGIN_FAILED, data: res.data });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILED, data: error });
    console.error(error);
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  const token = getState().auth.key;
  let headers = {
    Authorization: `Token ${token}`
  };
  try {
    const res = await Axios.post("/api/accounts/logout/", { headers: headers });
    dispatch({ type: LOGOUT_SUCCESS, data: res.data });
  } catch (error) {
    console.error(error);
  }
};
