import {
	ADD_PRODUCT_FAILED,
	ADD_PRODUCT_GO,
	ADD_PRODUCT_TRY,
	CLEAR_CURRENT,
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

export const getProducts = () => {
	return {
		type: GET_PRODUCTS_TRY,
	};
};

export const gettingProducts = (data) => {
	return {
		type: GET_PRODUCTS_GO,
		payload: data,
	};
};

export const getProductsFailed = (error) => {
	return {
		type: GET_PRODUCTS_FAILED,
		payload: error,
	};
};

export const getPreviews = () => {
	return {
		type: GET_PREVPROD_TRY,
	};
};

export const gettingPreviews = (data) => {
	return {
		type: GET_PREVPROD_GO,
		payload: data,
	};
};

export const getPreviewsFailed = (error) => {
	return {
		type: GET_PREVPROD_FAILED,
		payload: error,
	};
};

export const getProduct = (fmlink) => {
	return {
		type: GET_APRODUCT_TRY,
		payload: fmlink,
	};
};

export const gettingProduct = (data) => {
	return {
		type: GET_APRODUCT_GO,
		payload: data,
	};
};

export const getProductFailed = (error) => {
	return {
		type: GET_APRODUCT_FAILED,
		payload: error,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const addProduct = (formData) => {
	return {
		type: ADD_PRODUCT_TRY,
		payload: { formData },
	};
};

export const productAdded = (data) => {
	return {
		type: ADD_PRODUCT_GO,
		payload: data,
	};
};

export const addProductFailed = (error) => {
	return {
		type: ADD_PRODUCT_FAILED,
		payload: error,
	};
};

export const editProduct = (formData) => {
	return {
		type: EDIT_PRODUCT_TRY,
		payload: { formData },
	};
};

export const productEdited = (data) => {
	return {
		type: EDIT_PRODUCT_GO,
		payload: data,
	};
};

export const editProductFailed = (error) => {
	return {
		type: EDIT_PRODUCT_FAILED,
		payload: error,
	};
};

export const removeProduct = (id) => {
	return {
		type: REMOVE_PRODUCT_TRY,
		payload: id,
	};
};

export const removingProduct = (data) => {
	return {
		type: REMOVE_PRODUCT_GO,
		payload: data,
	};
};

export const removeProductFailed = (error) => {
	return {
		type: REMOVE_PRODUCT_FAILED,
		payload: error,
	};
};
