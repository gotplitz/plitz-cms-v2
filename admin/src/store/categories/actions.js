import {
	ADD_CATEGORY_FAILED,
	ADD_CATEGORY_GO,
	ADD_CATEGORY_TRY,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	EDIT_CATEGORY_FAILED,
	EDIT_CATEGORY_GO,
	EDIT_CATEGORY_TRY,
	FILTER_ITEMS,
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

export const getCategories = () => {
	return {
		type: GET_CATEGORIES_TRY,
	};
};

export const gettingCategories = (data) => {
	return {
		type: GET_CATEGORIES_GO,
		payload: data,
	};
};

export const getCategoriesFailed = (error) => {
	return {
		type: GET_CATEGORIES_FAILED,
		payload: error,
	};
};

export const getCategory = (fmlink) => {
	return {
		type: GET_ACATEGORY_TRY,
		payload: fmlink,
	};
};

export const gettingCategory = (data) => {
	return {
		type: GET_ACATEGORY_GO,
		payload: data,
	};
};

export const getCategoryFailed = (error) => {
	return {
		type: GET_ACATEGORY_FAILED,
		payload: error,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const addCategory = (formData) => {
	return {
		type: ADD_CATEGORY_TRY,
		payload: { formData },
	};
};

export const categoryAdded = (data) => {
	return {
		type: ADD_CATEGORY_GO,
		payload: data,
	};
};

export const addCategoryFailed = (error) => {
	return {
		type: ADD_CATEGORY_FAILED,
		payload: error,
	};
};

export const editCategory = (formData) => {
	return {
		type: EDIT_CATEGORY_TRY,
		payload: { formData },
	};
};

export const categoryEdited = (data) => {
	return {
		type: EDIT_CATEGORY_GO,
		payload: data,
	};
};

export const editCategoryFailed = (error) => {
	return {
		type: EDIT_CATEGORY_FAILED,
		payload: error,
	};
};

export const removeCategory = (id) => {
	return {
		type: REMOVE_CATEGORY_TRY,
		payload: id,
	};
};

export const removingCategory = (data) => {
	return {
		type: REMOVE_CATEGORY_GO,
		payload: data,
	};
};

export const removeCategoryFailed = (error) => {
	return {
		type: REMOVE_CATEGORY_FAILED,
		payload: error,
	};
};

export const filterItems = (searchtext) => {
	return {
		type: FILTER_ITEMS,
		payload: searchtext,
	};
};

export const clearFilter = () => {
	return {
		type: CLEAR_FILTER,
	};
};
