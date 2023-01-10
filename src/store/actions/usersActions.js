import axios from "../../axiosBar";
import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../actionTypes";

const registerUserRequest = () => {
  return { type: REGISTER_USER_REQUEST };
};

const registerUserSuccess = () => {
  return { type: REGISTER_USER_SUCCESS };
};

export const registerUserFailure = (error) => {
  return { type: REGISTER_USER_FAILURE, error };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(registerUserRequest());
    try {
      await axios.post("/users", userData);
      dispatch(registerUserSuccess());
    } catch (e) {
      if (e?.response?.data) {
        dispatch(registerUserFailure(e.response.data));
      } else {
        dispatch(registerUserFailure({ global: "Потеряно соединение" }));
      }
    }
  };
};

const loginUserSuccess = (user) => {
  return { type: LOGIN_USER_SUCCESS, user };
};

const loginUserFailure = (error) => {
  return { type: LOGIN_USER_FAILURE, error };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("users/session", userData);
      dispatch(loginUserSuccess(response.data));
    } catch (e) {
      dispatch(loginUserFailure(e?.response?.data.message));
    }
  };
};

const signoutUserSuccess = (user) => {
  return { type: LOGIN_USER_SUCCESS, user };
};

const signoutUserFailure = (error) => {
  return { type: LOGIN_USER_FAILURE, error };
};

export const signoutUser = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(signoutUserSuccess(null));
      navigate("/");
    } catch (e) {
      dispatch(signoutUserFailure(e));
    }
  };
};