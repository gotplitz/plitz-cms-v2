import {
	ADD_NOTICIA_FAILED,
	ADD_NOTICIA_GO,
	ADD_NOTICIA_TRY,
	CLEAR_CURRENT,
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

export const getNoticias = () => {
	return {
		type: GET_NOTICIAS_TRY,
	};
};

export const gettingNoticias = (data) => {
	return {
		type: GET_NOTICIAS_GO,
		payload: data,
	};
};

export const getNoticiasFailed = (error) => {
	return {
		type: GET_NOTICIAS_FAILED,
		payload: error,
	};
};

export const getNoticia = (fmlink) => {
	return {
		type: GET_ANOTICIA_TRY,
		payload: fmlink,
	};
};

export const gettingNoticia = (data) => {
	return {
		type: GET_ANOTICIA_GO,
		payload: data,
	};
};

export const getNoticiaFailed = (error) => {
	return {
		type: GET_ANOTICIA_FAILED,
		payload: error,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const addNoticia = (formData) => {
	return {
		type: ADD_NOTICIA_TRY,
		payload: { formData },
	};
};

export const noticiaAdded = (data) => {
	return {
		type: ADD_NOTICIA_GO,
		payload: data,
	};
};

export const addNoticiaFailed = (error) => {
	return {
		type: ADD_NOTICIA_FAILED,
		payload: error,
	};
};

export const editNoticia = (formData) => {
	return {
		type: EDIT_NOTICIA_TRY,
		payload: { formData },
	};
};

export const noticiaEdited = (data) => {
	return {
		type: EDIT_NOTICIA_GO,
		payload: data,
	};
};

export const editNoticiaFailed = (error) => {
	return {
		type: EDIT_NOTICIA_FAILED,
		payload: error,
	};
};

export const removeNoticia = (id) => {
	return {
		type: REMOVE_NOTICIA_TRY,
		payload: id,
	};
};

export const removingNoticia = (data) => {
	return {
		type: REMOVE_NOTICIA_GO,
		payload: data,
	};
};

export const removeNoticiaFailed = (error) => {
	return {
		type: REMOVE_NOTICIA_FAILED,
		payload: error,
	};
};
