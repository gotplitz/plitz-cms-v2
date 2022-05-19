import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_SERIE_FAILED,
	ADD_SERIE_GO,
	ADD_SERIE_TRY,
	EDIT_SERIE_FAILED,
	EDIT_SERIE_GO,
	EDIT_SERIE_TRY,
	GET_ASERIE_FAILED,
	GET_ASERIE_GO,
	GET_ASERIE_TRY,
	GET_SERIES_FAILED,
	GET_SERIES_GO,
	GET_SERIES_TRY,
	REMOVE_SERIE_FAILED,
	REMOVE_SERIE_GO,
	REMOVE_SERIE_TRY,
} from './actionTypes';

import {
	addSerie,
	editSerie,
	getAllSeriesApi,
	getSerieApi,
	removeSerie,
} from '../../helpers/serieApi';

function* theSeriesPull() {
	try {
		const response = yield call(getAllSeriesApi);

		yield put({ type: GET_SERIES_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_SERIES_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* oneSeriePull({ payload }) {
	try {
		const response = yield call(getSerieApi, payload);

		yield put({ type: GET_ASERIE_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_ASERIE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* addingSerie({ payload: { formData } }) {
	try {
		const response = yield call(addSerie, formData);

		yield put({ type: ADD_SERIE_GO, payload: response.data.serie });
	} catch (error) {
		yield put({
			type: ADD_SERIE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* editingSerie({ payload: { formData } }) {
	try {
		const response = yield call(editSerie, formData);

		yield put({ type: EDIT_SERIE_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: EDIT_SERIE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* removingSerie({ payload: id }) {
	try {
		const response = yield call(removeSerie, id);

		yield put({ type: REMOVE_SERIE_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: REMOVE_SERIE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* pullingSeries() {
	yield takeLatest(GET_SERIES_TRY, theSeriesPull);
}

function* pullingSerie() {
	yield takeLatest(GET_ASERIE_TRY, oneSeriePull);
}

function* addSerieTry() {
	yield takeLatest(ADD_SERIE_TRY, addingSerie);
}

function* editingSerieTry() {
	yield takeLatest(EDIT_SERIE_TRY, editingSerie);
}

function* removingSerieTry() {
	yield takeLatest(REMOVE_SERIE_TRY, removingSerie);
}

function* SeriesSaga() {
	yield all([
		pullingSeries(),
		pullingSerie(),
		addSerieTry(),
		editingSerieTry(),
		removingSerieTry(),
	]);
}

export default SeriesSaga;
