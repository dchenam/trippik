export const API_START = "api_start";
export const API_END = "api_end";
export const API_ERROR = "api_error";

export const apiStart = label => ({
  type: API_START,
  payload: label
});
