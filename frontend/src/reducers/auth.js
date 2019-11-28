import {
  USER_LOADING,
  USER_LOADED,
  AUTHENTICATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL
} from "../services/constants";

const initialState = {
  key: localStorage.getItem("key"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.user
      };
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("key", action.payload.key);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        errors: null
      };

    case AUTHENTICATION_ERROR:
    case LOGIN_FAILED:
    case REGISTRATION_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("key");
      localStorage.removeItem("trip-token");
      return {
        ...state,
        errors: action.error,
        key: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
};
