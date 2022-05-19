import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	LOGS_FAILED,
	LOGS_GET,
	LOGS_TRY,
	POST_FAILED,
	POST_GO,
	POST_TRY,
} from './actionTypes';

import { getActivityApi, postActivityApi } from '../../helpers/activiyUserApi';

function* theActivityPull() {
	try {
		const response = yield call(getActivityApi);

		yield put({ type: LOGS_GET, payload: response.data });
	} catch (error) {
		yield put({ type: LOGS_FAILED, payload: error.response.data.message });
	}
}

function* thePostingActivity({ payload: { formData } }) {
	try {
		const response = yield call(postActivityApi, formData);

		yield put({ type: POST_GO, payload: response.data });
	} catch (error) {
		yield put({ type: POST_FAILED, payload: error.response.data.message });
	}
}

function* pullingActivity() {
	yield takeLatest(LOGS_TRY, theActivityPull);
}

function* postingActivity() {
	yield takeLatest(POST_TRY, thePostingActivity);
}

function* ActivitySaga() {
	yield all([pullingActivity(), postingActivity()]);
}

export default ActivitySaga;
