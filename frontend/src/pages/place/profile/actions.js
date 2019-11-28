import { API_ERROR } from "../../../services/constants";
import request from "../../../utils/request";
export const FETCH_PLACE_SUCCESS = "FETCH_PLACE_SUCCESS";

export const fetchPlace = id =>
  request({
    url: `/api/places/${id}`,
    onSuccess: (data, dispatch) => {
      dispatch({ type: FETCH_PLACE_SUCCESS, payload: data });
    },
    onFailure: (error, dispatch) => {
      dispatch({ type: API_ERROR, error: error });
    }
  });
