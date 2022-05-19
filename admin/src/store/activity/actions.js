import {
	LOGS_FAILED,
	LOGS_GET,
	LOGS_TRY,
	POST_FAILED,
	POST_GO,
	POST_TRY,
} from './actionTypes';

export const gettingActivity = () => {
	return {
		type: LOGS_TRY,
	};
};

export const gotActivity = (data) => {
	return {
		type: LOGS_GET,
		payload: data,
	};
};

export const gettingFailed = (error) => {
	return {
		type: LOGS_FAILED,
		payload: error,
	};
};

export const postActivity = (formData) => {
	return {
		type: POST_TRY,
		payload: { formData },
	};
};

export const postingActivity = (data) => {
	return {
		type: POST_GO,
		payload: data,
	};
};

export const postingFailed = (error) => {
	return {
		type: POST_FAILED,
		payload: error,
	};
};
