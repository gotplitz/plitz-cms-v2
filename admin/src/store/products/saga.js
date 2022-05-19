import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	ADD_PRODUCT_FAILED,
	ADD_PRODUCT_GO,
	ADD_PRODUCT_TRY,
	EDIT_PRODUCT_FAILED,
	EDIT_PRODUCT_GO,
	EDIT_PRODUCT_TRY,
	GET_APRODUCT_FAILED,
	GET_APRODUCT_GO,
	GET_APRODUCT_TRY,
	GET_PREVPROD_FAILED,
	GET_PREVPROD_GO,
	GET_PREVPROD_TRY,
	GET_PRODUCTS_FAILED,
	GET_PRODUCTS_GO,
	GET_PRODUCTS_TRY,
	REMOVE_PRODUCT_FAILED,
	REMOVE_PRODUCT_GO,
	REMOVE_PRODUCT_TRY,
} from './actionTypes';

import {
	addProduct,
	editProduct,
	getAllProductsApi,
	getProdsPrevsApi,
	getProductApi,
	removeProduct,
} from '../../helpers/productApi';

function* thePreviewsPull() {
	try {
		const response = yield call(getProdsPrevsApi);

		yield put({ type: GET_PREVPROD_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_PREVPROD_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* theProductsPull() {
	try {
		const response = yield call(getAllProductsApi);

		yield put({ type: GET_PRODUCTS_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_PRODUCTS_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* oneProductPull({ payload }) {
	try {
		const response = yield call(getProductApi, payload);

		yield put({ type: GET_APRODUCT_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: GET_APRODUCT_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* addingProduct({ payload: { formData } }) {
	try {
		const response = yield call(addProduct, formData);

		yield put({ type: ADD_PRODUCT_GO, payload: response.data.product });
	} catch (error) {
		yield put({
			type: ADD_PRODUCT_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* editingProduct({ payload: { formData } }) {
	try {
		const response = yield call(editProduct, formData);

		yield put({ type: EDIT_PRODUCT_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: EDIT_PRODUCT_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* removingProduct({ payload: id }) {
	try {
		const response = yield call(removeProduct, id);

		yield put({ type: REMOVE_PRODUCT_GO, payload: response.data });
	} catch (error) {
		yield put({
			type: REMOVE_PRODUCT_FAILED,
			payload: error.response.data.message,
		});
	}
}

function* pullingPreviews() {
	yield takeLatest(GET_PREVPROD_TRY, thePreviewsPull);
}

function* pullingProducts() {
	yield takeLatest(GET_PRODUCTS_TRY, theProductsPull);
}

function* pullingProduct() {
	yield takeLatest(GET_APRODUCT_TRY, oneProductPull);
}

function* addProductTry() {
	yield takeLatest(ADD_PRODUCT_TRY, addingProduct);
}

function* editingProductTry() {
	yield takeLatest(EDIT_PRODUCT_TRY, editingProduct);
}

function* removingProductTry() {
	yield takeLatest(REMOVE_PRODUCT_TRY, removingProduct);
}

function* ProductsSaga() {
	yield all([
		pullingProducts(),
		pullingProduct(),
		addProductTry(),
		editingProductTry(),
		removingProductTry(),
		pullingPreviews(),
	]);
}

export default ProductsSaga;
