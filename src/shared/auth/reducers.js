import {
  USER_LOADING,
  USER_LOADED,
  AUTHENTICATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS
} from "./actions";

const initialState = {
  key: localStorage.getItem("key"),
  isAuthenticated: null,
  isLoading: null,
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
    case LOGIN_SUCCESS:
      localStorage.setItem("key", action.data.key);
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        isLoading: false,
        errors: null
      };
    case AUTHENTICATION_ERROR:
    case LOGIN_FAILED:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("key");
      return {
        ...state,
        errors: action.data,
        key: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
};
