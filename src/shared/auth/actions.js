import apiAction from "..";
import { push } from "connected-react-router";

export const USER_LOADING = "user_loading";
export const USER_LOADED = "user_loaded";
export const AUTHENTICATION_ERROR = "authentication_error";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAILED = "login_failed";
export const LOGOUT_SUCCESS = "logout_success";

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAIL = "REGISTRATION_FAIL";

export const loadUser = () =>
  apiAction({
    url: "/api/accounts/user/",
    accessToken: localStorage.getItem("key"),
    onSuccess: (data, dispatch) => {
      dispatch({ type: USER_LOADED, user: data });
    }
  });

export const loginUser = (username, password, history, location) =>
  apiAction({
    url: "/api/accounts/login/",
    method: "POST",
    data: { username, password },
    onSuccess: (data, dispatch) => {
      const { state = {} } = location;
      const { prevLocation } = state;
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      history.push(prevLocation || "/");
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: LOGIN_FAILED, error: error });
    }
  });

export const logoutUser = () =>
  apiAction({
    url: "/api/accounts/logout/",
    method: "POST",
    onSuccess: (_data, dispatch) => {
      dispatch({ type: LOGOUT_SUCCESS, error: null });
    }
  });

export const registerUser = values =>
  apiAction({
    url: "/api/accounts/registration/",
    method: "POST",
    data: values,
    onSuccess: (data, dispatch) => {
      dispatch({ type: REGISTRATION_SUCCESS, payload: data });
      dispatch(push("/"));
    },
    onFailure: (error, dispatch) => {
      console.log(error);
      dispatch({ type: REGISTRATION_FAIL, error: error });
    }
  });
