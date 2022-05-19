import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_FOLDER_FAILED,
	ADD_FOLDER_GO,
	ADD_FOLDER_TRY,
	EDIT_FOLDER_FAILED,
	EDIT_FOLDER_GO,
	EDIT_FOLDER_TRY,
	GET_AFOLDER_FAILED,
	GET_AFOLDER_GO,
	GET_AFOLDER_TRY,
	GET_FOLDERS_FAILED,
	GET_FOLDERS_GO,
	GET_FOLDERS_TRY,
	REMOVE_FOLDER_FAILED,
	REMOVE_FOLDER_GO,
	REMOVE_FOLDER_TRY,
} from './actionTypes';

import {
	addFolder,
	editFolder,
	getAllFoldersApi,
	getFolderApi,
	removeFolder,
} from '../../helpers/folderApi';

function* theFoldersPull() {
	try {
		const response = yield call(getAllFoldersApi);

		yield put({ type: GET_FOLDERS_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_FOLDERS_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* oneFolderPull({ payload }) {
	try {
		const response = yield call(getFolderApi, payload);

		yield put({ type: GET_AFOLDER_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_AFOLDER_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* addingFolder({ payload: { formData } }) {
	try {
		const response = yield call(addFolder, formData);

		yield put({ type: ADD_FOLDER_GO, payload: response.data.folder });
	} catch (error) {
		yield put({
			type: ADD_FOLDER_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* editingFolder({ payload: { formData } }) {
	try {
		const response = yield call(editFolder, formData);

		yield put({ type: EDIT_FOLDER_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: EDIT_FOLDER_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* removingFolder({ payload: id }) {
	try {
		const response = yield call(removeFolder, id);

		yield put({ type: REMOVE_FOLDER_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: REMOVE_FOLDER_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* pullingFolders() {
	yield takeLatest(GET_FOLDERS_TRY, theFoldersPull);
}

function* pullingFolder() {
	yield takeLatest(GET_AFOLDER_TRY, oneFolderPull);
}

function* addFolderTry() {
	yield takeLatest(ADD_FOLDER_TRY, addingFolder);
}

function* editingFolderTry() {
	yield takeLatest(EDIT_FOLDER_TRY, editingFolder);
}

function* removingFolderTry() {
	yield takeLatest(REMOVE_FOLDER_TRY, removingFolder);
}

function* FoldersSaga() {
	yield all([
		pullingFolders(),
		pullingFolder(),
		addFolderTry(),
		editingFolderTry(),
		removingFolderTry(),
	]);
}

export default FoldersSaga;
