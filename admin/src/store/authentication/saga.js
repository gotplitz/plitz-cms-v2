import { takeLatest, put, call, all, takeEvery } from 'redux-saga/effects';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  TRY_LOGIN,
  USER_LOADED,
  AUTH_ERROR,
  REQUEST_USER,
  REGISTERING_USER,
  REGISTER_FAILED,
  REGISTER_TRY,
  CHANGEPASS_GO,
  CHANGEPASS_FAILED,
  CHANGEPASS_TRY,
  NEWPASS_GO,
  NEWPASS_FAILED,
  NEWPASS_TRY,
} from './actionTypes';

import {
  changePassApi,
  getUserApi,
  loginUserApi,
  newPassApi,
  registerUserApi,
} from '../../helpers/loginUserApi';

function* theLoginUser({ payload: { formData } }) {
  try {
    const response = yield call(loginUserApi, formData);

    yield put({ type: LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
}

function* theLoadingUser() {
  try {
    const response = yield call(getUserApi);
    yield put({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    yield put({ type: AUTH_ERROR, payload: error.response.data.message });
  }
}

function* theRegisteringUser({ payload: { formData } }) {
  try {
    const response = yield call(registerUserApi, formData);

    yield put({ type: REGISTERING_USER, payload: response });
  } catch (error) {
    yield put({ type: REGISTER_FAILED, payload: error.response.data.message });
  }
}

function* theChangingPass({ payload }) {
  try {
    const response = yield call(changePassApi, payload);

    yield put({ type: CHANGEPASS_GO, payload: response.data.msg });
  } catch (error) {
    yield put({
      type: CHANGEPASS_FAILED,
      payload: error.response.data.message,
    });
  }
}

function* theNewPassword({ payload: { formData } }) {
  try {
    const response = yield call(newPassApi, formData);

    yield put({ type: NEWPASS_GO, payload: response });
  } catch (error) {
    yield put({ type: NEWPASS_FAILED, payload: error.response.data.message });
  }
}

function* theLoggedUser() {
  yield takeLatest(TRY_LOGIN, theLoginUser);
}

function* theLoadedUser() {
  yield takeEvery(REQUEST_USER, theLoadingUser);
}

function* theRegisteredUser() {
  yield takeLatest(REGISTER_TRY, theRegisteringUser);
}

function* theChangedPass() {
  yield takeLatest(CHANGEPASS_TRY, theChangingPass);
}

function* theNewPass() {
  yield takeLatest(NEWPASS_TRY, theNewPassword);
}

function* LoginSaga() {
  yield all([
    theLoggedUser(),
    theLoadedUser(),
    theRegisteredUser(),
    theChangedPass(),
    theNewPass(),
  ]);
}

export default LoginSaga;
