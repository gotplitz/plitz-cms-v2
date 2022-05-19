import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_PAGE_FAILED,
	ADD_PAGE_GO,
	ADD_PAGE_TRY,
	EDIT_PAGE_FAILED,
	EDIT_PAGE_GO,
	EDIT_PAGE_TRY,
	GET_APAGE_FAILED,
	GET_APAGE_GO,
	GET_APAGE_TRY,
	GET_PAGES_FAILED,
	GET_PAGES_GO,
	GET_PAGES_TRY,
	REMOVE_PAGE_FAILED,
	REMOVE_PAGE_GO,
	REMOVE_PAGE_TRY,
} from './actionTypes';

import {
	addPage,
	editPage,
	getAllPagesApi,
	getPageApi,
	removePage,
} from '../../helpers/pageApi';

function* thePagesPull() {
	try {
		const response = yield call(getAllPagesApi);

		yield put({ type: GET_PAGES_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_PAGES_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* onePagePull({ payload }) {
	try {
		const response = yield call(getPageApi, payload);

		yield put({ type: GET_APAGE_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_APAGE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* addingPage({ payload: { formData } }) {
	try {
		const response = yield call(addPage, formData);

		yield put({ type: ADD_PAGE_GO, payload: response.data.page });
	} catch (error) {
		yield put({
			type: ADD_PAGE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* editingPage({ payload: { formData } }) {
	try {
		const response = yield call(editPage, formData);

		yield put({ type: EDIT_PAGE_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: EDIT_PAGE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* removingPage({ payload: id }) {
	try {
		const response = yield call(removePage, id);

		yield put({ type: REMOVE_PAGE_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: REMOVE_PAGE_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* pullingPages() {
	yield takeLatest(GET_PAGES_TRY, thePagesPull);
}

function* pullingPage() {
	yield takeLatest(GET_APAGE_TRY, onePagePull);
}

function* addPageTry() {
	yield takeLatest(ADD_PAGE_TRY, addingPage);
}

function* editingPageTry() {
	yield takeLatest(EDIT_PAGE_TRY, editingPage);
}

function* removingPageTry() {
	yield takeLatest(REMOVE_PAGE_TRY, removingPage);
}

function* PagesSaga() {
	yield all([
		pullingPages(),
		pullingPage(),
		addPageTry(),
		editingPageTry(),
		removingPageTry(),
	]);
}

export default PagesSaga;
