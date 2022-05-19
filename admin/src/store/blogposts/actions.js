import {
	ADD_BLOGPOST_FAILED,
	ADD_BLOGPOST_GO,
	ADD_BLOGPOST_TRY,
	CLEAR_CURRENT,
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

export const getBlogposts = () => {
	return {
		type: GET_BLOGPOSTS_TRY,
	};
};

export const gettingBlogposts = (data) => {
	return {
		type: GET_BLOGPOSTS_GO,
		payload: data,
	};
};

export const getBlogpostsFailed = (error) => {
	return {
		type: GET_BLOGPOSTS_FAILED,
		payload: error,
	};
};

export const getBlogpost = (fmlink) => {
	return {
		type: GET_ABLOGPOST_TRY,
		payload: fmlink,
	};
};

export const gettingBlogpost = (data) => {
	return {
		type: GET_ABLOGPOST_GO,
		payload: data,
	};
};

export const getBlogpostFailed = (error) => {
	return {
		type: GET_ABLOGPOST_FAILED,
		payload: error,
	};
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

export const addBlogpost = (formData) => {
	return {
		type: ADD_BLOGPOST_TRY,
		payload: { formData },
	};
};

export const blogpostAdded = (data) => {
	return {
		type: ADD_BLOGPOST_GO,
		payload: data,
	};
};

export const addBlogpostFailed = (error) => {
	return {
		type: ADD_BLOGPOST_FAILED,
		payload: error,
	};
};

export const editBlogpost = (formData) => {
	return {
		type: EDIT_BLOGPOST_TRY,
		payload: { formData },
	};
};

export const blogpostEdited = (data) => {
	return {
		type: EDIT_BLOGPOST_GO,
		payload: data,
	};
};

export const editBlogpostFailed = (error) => {
	return {
		type: EDIT_BLOGPOST_FAILED,
		payload: error,
	};
};

export const removeBlogpost = (id) => {
	return {
		type: REMOVE_BLOGPOST_TRY,
		payload: id,
	};
};

export const removingBlogpost = (data) => {
	return {
		type: REMOVE_BLOGPOST_GO,
		payload: data,
	};
};

export const removeBlogpostFailed = (error) => {
	return {
		type: REMOVE_BLOGPOST_FAILED,
		payload: error,
	};
};
