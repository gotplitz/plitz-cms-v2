import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_NOTICIA_FAILED,
	ADD_NOTICIA_GO,
	ADD_NOTICIA_TRY,
	EDIT_NOTICIA_FAILED,
	EDIT_NOTICIA_GO,
	EDIT_NOTICIA_TRY,
	GET_ANOTICIA_FAILED,
	GET_ANOTICIA_GO,
	GET_ANOTICIA_TRY,
	GET_NOTICIAS_FAILED,
	GET_NOTICIAS_GO,
	GET_NOTICIAS_TRY,
	REMOVE_NOTICIA_FAILED,
	REMOVE_NOTICIA_GO,
	REMOVE_NOTICIA_TRY,
} from './actionTypes';

import {
	addNoticia,
	editNoticia,
	getAllNoticiasApi,
	getNoticiaApi,
	removeNoticia,
} from '../../helpers/noticiaApi';

function* theNoticiasPull() {
	try {
		const response = yield call(getAllNoticiasApi);

		yield put({ type: GET_NOTICIAS_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_NOTICIAS_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* oneNoticiaPull({ payload }) {
	try {
		const response = yield call(getNoticiaApi, payload);

		yield put({ type: GET_ANOTICIA_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_ANOTICIA_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* addingNoticia({ payload: { formData } }) {
	try {
		const response = yield call(addNoticia, formData);

		yield put({ type: ADD_NOTICIA_GO, payload: response.data.noticia });
	} catch (error) {
		yield put({
			type: ADD_NOTICIA_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* editingNoticia({ payload: { formData } }) {
	try {
		const response = yield call(editNoticia, formData);

		yield put({ type: EDIT_NOTICIA_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: EDIT_NOTICIA_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* removingNoticia({ payload: id }) {
	try {
		const response = yield call(removeNoticia, id);

		yield put({ type: REMOVE_NOTICIA_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: REMOVE_NOTICIA_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* pullingNoticias() {
	yield takeLatest(GET_NOTICIAS_TRY, theNoticiasPull);
}

function* pullingNoticia() {
	yield takeLatest(GET_ANOTICIA_TRY, oneNoticiaPull);
}

function* addNoticiaTry() {
	yield takeLatest(ADD_NOTICIA_TRY, addingNoticia);
}

function* editingNoticiaTry() {
	yield takeLatest(EDIT_NOTICIA_TRY, editingNoticia);
}

function* removingNoticiaTry() {
	yield takeLatest(REMOVE_NOTICIA_TRY, removingNoticia);
}

function* NoticiasSaga() {
	yield all([
		pullingNoticias(),
		pullingNoticia(),
		addNoticiaTry(),
		editingNoticiaTry(),
		removingNoticiaTry(),
	]);
}

export default NoticiasSaga;
