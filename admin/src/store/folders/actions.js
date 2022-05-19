import {
	ADD_FOLDER_FAILED,
	ADD_FOLDER_GO,
	ADD_FOLDER_TRY,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	EDIT_FOLDER_FAILED,
	EDIT_FOLDER_GO,
	EDIT_FOLDER_TRY,
	FILTER_ITEMS,
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

export const getFolders = () => {
	return {
		type: GET_FOLDERS_TRY,
	};
};

export const gettingFolders = (data) => {
	return {
		type: GET_FOLDERS_GO,
		payload: data,
	};
};

export const getFoldersFailed = (error) => {
	return {
		type: GET_FOLDERS_FAILED,
		payload: error,
	};
};

export const getFolder = (fmlink) => {
	return {
		type: GET_AFOLDER_TRY,
		payload: fmlink,
	};
};

export const gettingFolder = (data) => {
	return {
		type: GET_AFOLDER_GO,
		payload: data,
	};
};

export const getFolderFailed = (error) => {
	return {
		type: GET_AFOLDER_FAILED,
		payload: error,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const addFolder = (formData) => {
	return {
		type: ADD_FOLDER_TRY,
		payload: { formData },
	};
};

export const folderAdded = (data) => {
	return {
		type: ADD_FOLDER_GO,
		payload: data,
	};
};

export const addFolderFailed = (error) => {
	return {
		type: ADD_FOLDER_FAILED,
		payload: error,
	};
};

export const editFolder = (formData) => {
	return {
		type: EDIT_FOLDER_TRY,
		payload: { formData },
	};
};

export const folderEdited = (data) => {
	return {
		type: EDIT_FOLDER_GO,
		payload: data,
	};
};

export const editFolderFailed = (error) => {
	return {
		type: EDIT_FOLDER_FAILED,
		payload: error,
	};
};

export const removeFolder = (id) => {
	return {
		type: REMOVE_FOLDER_TRY,
		payload: id,
	};
};

export const removingFolder = (data) => {
	return {
		type: REMOVE_FOLDER_GO,
		payload: data,
	};
};

export const removeFolderFailed = (error) => {
	return {
		type: REMOVE_FOLDER_FAILED,
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
