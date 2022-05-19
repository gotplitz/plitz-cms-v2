import {
	ADD_SERIE_FAILED,
	ADD_SERIE_GO,
	ADD_SERIE_TRY,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	EDIT_SERIE_FAILED,
	EDIT_SERIE_GO,
	EDIT_SERIE_TRY,
	FILTER_ITEMS,
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

export const getSeries = () => {
	return {
		type: GET_SERIES_TRY,
	};
};

export const gettingSeries = (data) => {
	return {
		type: GET_SERIES_GO,
		payload: data,
	};
};

export const getSeriesFailed = (error) => {
	return {
		type: GET_SERIES_FAILED,
		payload: error,
	};
};

export const getSerie = (fmlink) => {
	return {
		type: GET_ASERIE_TRY,
		payload: fmlink,
	};
};

export const gettingSerie = (data) => {
	return {
		type: GET_ASERIE_GO,
		payload: data,
	};
};

export const getSerieFailed = (error) => {
	return {
		type: GET_ASERIE_FAILED,
		payload: error,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const addSerie = (formData) => {
	return {
		type: ADD_SERIE_TRY,
		payload: { formData },
	};
};

export const serieAdded = (data) => {
	return {
		type: ADD_SERIE_GO,
		payload: data,
	};
};

export const addSerieFailed = (error) => {
	return {
		type: ADD_SERIE_FAILED,
		payload: error,
	};
};

export const editSerie = (formData) => {
	return {
		type: EDIT_SERIE_TRY,
		payload: { formData },
	};
};

export const serieEdited = (data) => {
	return {
		type: EDIT_SERIE_GO,
		payload: data,
	};
};

export const editSerieFailed = (error) => {
	return {
		type: EDIT_SERIE_FAILED,
		payload: error,
	};
};

export const removeSerie = (id) => {
	return {
		type: REMOVE_SERIE_TRY,
		payload: id,
	};
};

export const removingSerie = (data) => {
	return {
		type: REMOVE_SERIE_GO,
		payload: data,
	};
};

export const removeSerieFailed = (error) => {
	return {
		type: REMOVE_SERIE_FAILED,
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
