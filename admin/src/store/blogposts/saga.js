import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_BLOGPOST_FAILED,
	ADD_BLOGPOST_GO,
	ADD_BLOGPOST_TRY,
	EDIT_BLOGPOST_FAILED,
	EDIT_BLOGPOST_GO,
	EDIT_BLOGPOST_TRY,
	GET_ABLOGPOST_FAILED,
	GET_ABLOGPOST_GO,
	GET_ABLOGPOST_TRY,
	GET_BLOGPOSTS_FAILED,
	GET_BLOGPOSTS_GO,
	GET_BLOGPOSTS_TRY,
	REMOVE_BLOGPOST_FAILED,
	REMOVE_BLOGPOST_GO,
	REMOVE_BLOGPOST_TRY,
} from './actionTypes';

import {
	addBlogpost,
	editBlogpost,
	getAllBlogpostsApi,
	getBlogpostApi,
	removeBlogpost,
} from '../../helpers/blogpostApi';

function* theBlogpostsPull() {
	try {
		const response = yield call(getAllBlogpostsApi);

		yield put({ type: GET_BLOGPOSTS_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_BLOGPOSTS_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* oneBlogpostPull({ payload }) {
	try {
		const response = yield call(getBlogpostApi, payload);

		yield put({ type: GET_ABLOGPOST_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_ABLOGPOST_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* addingBlogpost({ payload: { formData } }) {
	try {
		const response = yield call(addBlogpost, formData);

		yield put({ type: ADD_BLOGPOST_GO, payload: response.data.blogpost });
	} catch (error) {
		yield put({
			type: ADD_BLOGPOST_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* editingBlogpost({ payload: { formData } }) {
	try {
		const response = yield call(editBlogpost, formData);

		yield put({ type: EDIT_BLOGPOST_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: EDIT_BLOGPOST_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* removingBlogpost({ payload: id }) {
	try {
		const response = yield call(removeBlogpost, id);

		yield put({ type: REMOVE_BLOGPOST_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: REMOVE_BLOGPOST_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* pullingBlogposts() {
	yield takeLatest(GET_BLOGPOSTS_TRY, theBlogpostsPull);
}

function* pullingBlogpost() {
	yield takeLatest(GET_ABLOGPOST_TRY, oneBlogpostPull);
}

function* addBlogpostTry() {
	yield takeLatest(ADD_BLOGPOST_TRY, addingBlogpost);
}

function* editingBlogpostTry() {
	yield takeLatest(EDIT_BLOGPOST_TRY, editingBlogpost);
}

function* removingBlogpostTry() {
	yield takeLatest(REMOVE_BLOGPOST_TRY, removingBlogpost);
}

function* BlogpostsSaga() {
	yield all([
		pullingBlogposts(),
		pullingBlogpost(),
		addBlogpostTry(),
		editingBlogpostTry(),
		removingBlogpostTry(),
	]);
}

export default BlogpostsSaga;
