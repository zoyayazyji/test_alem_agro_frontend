import { PROFILE_INFO_SUCCESS, FETCH_REQUEST, FETCH_ERROR, ONE_POST_SUCCESS } from "../actionTypes";
import axios from "axios";

export const fetchOnePostSuccess = (value) => {
  return { type: ONE_POST_SUCCESS, value };
};

const fetchProfileSuccess = (value) => {
  return { type: PROFILE_INFO_SUCCESS, value };
};

const fetchError = (error) => {
  return { type: FETCH_ERROR, error };
};

const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};

export const fetchGetProfile = () => {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get("https://randomuser.me/api");
      dispatch(fetchProfileSuccess(response.data.results[0]));
    } catch (e) {
      fetchError(e);
    }
  }
};




