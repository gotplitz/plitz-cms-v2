import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  TRY_LOGIN,
  REQUEST_USER,
  USER_LOGOUT,
  REGISTER_TRY,
  REGISTERING_USER,
  REGISTER_FAILED,
  CHANGEPASS_TRY,
  CHANGEPASS_GO,
  CHANGEPASS_FAILED,
  NEWPASS_TRY,
  NEWPASS_GO,
  NEWPASS_FAILED,
} from './actionTypes';

export const tryLogin = (formData) => {
  return {
    type: TRY_LOGIN,
    payload: { formData },
  };
};

export const loginUser = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const registerUser = (formData) => {
  return {
    type: REGISTER_TRY,
    payload: { formData },
  };
};

export const registeringUser = (data) => {
  return {
    type: REGISTERING_USER,
    payload: data,
  };
};

export const requestUser = () => {
  return {
    type: REQUEST_USER,
  };
};

export const loadUser = (user) => {
  return {
    type: USER_LOADED,
    payload: user,
  };
};

export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const registeringFail = (error) => {
  return {
    type: REGISTER_FAILED,
    payload: error,
  };
};

export const passwordChange = (email) => {
  return {
    type: CHANGEPASS_TRY,
    payload: { email },
  };
};

export const passwordChangedOk = (msg) => {
  return {
    type: CHANGEPASS_GO,
    payload: msg,
  };
};

export const newPassword = (formData) => {
  return {
    type: NEWPASS_TRY,
    payload: { formData },
  };
};

export const newPassOk = (data) => {
  return {
    type: NEWPASS_GO,
    payload: data,
  };
};

export const passwordChangeFailed = (error) => {
  return {
    type: CHANGEPASS_FAILED,
    payload: error,
  };
};

export const newPassFailed = (error) => {
  return {
    type: NEWPASS_FAILED,
    payload: error,
  };
};

export const authError = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error,
  };
};

export const userFail = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const logOut = () => {
  return {
    type: USER_LOGOUT,
  };
};
