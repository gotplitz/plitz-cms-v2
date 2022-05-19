import {
	ADD_PAGE_FAILED,
	ADD_PAGE_GO,
	ADD_PAGE_TRY,
	CLEAR_CURRENT,
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

export const getPages = () => {
	return {
		type: GET_PAGES_TRY,
	};
};

export const gettingPages = (data) => {
	return {
		type: GET_PAGES_GO,
		payload: data,
	};
};

export const getPagesFailed = (error) => {
	return {
		type: GET_PAGES_FAILED,
		payload: error,
	};
};

export const getPage = (fmlink) => {
	return {
		type: GET_APAGE_TRY,
		payload: fmlink,
	};
};

export const gettingPage = (data) => {
	return {
		type: GET_APAGE_GO,
		payload: data,
	};
};

export const getPageFailed = (error) => {
	return {
		type: GET_APAGE_FAILED,
		payload: error,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const addPage = (formData) => {
	return {
		type: ADD_PAGE_TRY,
		payload: { formData },
	};
};

export const pageAdded = (data) => {
	return {
		type: ADD_PAGE_GO,
		payload: data,
	};
};

export const addPageFailed = (error) => {
	return {
		type: ADD_PAGE_FAILED,
		payload: error,
	};
};

export const editPage = (formData) => {
	return {
		type: EDIT_PAGE_TRY,
		payload: { formData },
	};
};

export const pageEdited = (data) => {
	return {
		type: EDIT_PAGE_GO,
		payload: data,
	};
};

export const editPageFailed = (error) => {
	return {
		type: EDIT_PAGE_FAILED,
		payload: error,
	};
};

export const removePage = (id) => {
	return {
		type: REMOVE_PAGE_TRY,
		payload: id,
	};
};

export const removingPage = (data) => {
	return {
		type: REMOVE_PAGE_GO,
		payload: data,
	};
};

export const removePageFailed = (error) => {
	return {
		type: REMOVE_PAGE_FAILED,
		payload: error,
	};
};
