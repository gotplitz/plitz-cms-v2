import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_CATEGORY_FAILED,
	ADD_CATEGORY_GO,
	ADD_CATEGORY_TRY,
	EDIT_CATEGORY_FAILED,
	EDIT_CATEGORY_GO,
	EDIT_CATEGORY_TRY,
	GET_ACATEGORY_FAILED,
	GET_ACATEGORY_GO,
	GET_ACATEGORY_TRY,
	GET_CATEGORIES_FAILED,
	GET_CATEGORIES_GO,
	GET_CATEGORIES_TRY,
	REMOVE_CATEGORY_FAILED,
	REMOVE_CATEGORY_GO,
	REMOVE_CATEGORY_TRY,
} from './actionTypes';

import {
	addCategory,
	editCategory,
	getAllCategoriesApi,
	getCategoryApi,
	removeCategory,
} from '../../helpers/categoryApi';

function* theCategoriesPull() {
	try {
		const response = yield call(getAllCategoriesApi);

		yield put({ type: GET_CATEGORIES_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_CATEGORIES_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* oneCategoryPull({ payload }) {
	try {
		const response = yield call(getCategoryApi, payload);

		yield put({ type: GET_ACATEGORY_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_ACATEGORY_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* addingCategory({ payload: { formData } }) {
	try {
		const response = yield call(addCategory, formData);

		yield put({ type: ADD_CATEGORY_GO, payload: response.data.category });
	} catch (error) {
		yield put({
			type: ADD_CATEGORY_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* editingCategory({ payload: { formData } }) {
	try {
		const response = yield call(editCategory, formData);

		yield put({ type: EDIT_CATEGORY_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: EDIT_CATEGORY_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* removingCategory({ payload: id }) {
	try {
		const response = yield call(removeCategory, id);

		yield put({ type: REMOVE_CATEGORY_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: REMOVE_CATEGORY_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* pullingCategories() {
	yield takeLatest(GET_CATEGORIES_TRY, theCategoriesPull);
}

function* pullingCategory() {
	yield takeLatest(GET_ACATEGORY_TRY, oneCategoryPull);
}

function* addCategoryTry() {
	yield takeLatest(ADD_CATEGORY_TRY, addingCategory);
}

function* editingCategoryTry() {
	yield takeLatest(EDIT_CATEGORY_TRY, editingCategory);
}

function* removingCategoryTry() {
	yield takeLatest(REMOVE_CATEGORY_TRY, removingCategory);
}

function* CategoriesSaga() {
	yield all([
		pullingCategories(),
		pullingCategory(),
		addCategoryTry(),
		editingCategoryTry(),
		removingCategoryTry(),
	]);
}

export default CategoriesSaga;
