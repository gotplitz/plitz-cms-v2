import {
	LOGS_FAILED,
	LOGS_GET,
	LOGS_TRY,
	POST_FAILED,
	POST_GO,
	POST_TRY,
} from './actionTypes';

const initialState = {
	activity: [],
	loading: false,
	error: null,
};

const Activity = (state = initialState, action) => {
	switch (action.type) {
		case LOGS_TRY:
		case POST_TRY:
			return {
				...state,
				loading: true,
			};

		case LOGS_GET:
			return {
				...state,
				activity: action.payload,
				loading: false,
			};

		case POST_GO:
			return {
				...state,
				activity: [action.payload, ...state.activity],
				loading: false,
			};

		case POST_FAILED:
		case LOGS_FAILED:
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		default:
			return state;
	}
};

export default Activity;
