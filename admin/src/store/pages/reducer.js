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

const initialState = {
	pages: [],
	page: null,
	loading: false,
	error: null,
	msg: null,
};

const Pages = (state = initialState, action) => {
	switch (action.type) {
		case GET_PAGES_TRY:
		case GET_APAGE_TRY:
		case ADD_PAGE_TRY:
		case EDIT_PAGE_TRY:
		case REMOVE_PAGE_TRY:
			return {
				...state,
				loading: true,
			};

		case GET_PAGES_GO:
			return {
				...state,
				pages: action.payload,
				loading: false,
			};

		case ADD_PAGE_GO:
			return {
				...state,
				pages:
					state.pages.length === 0
						? [action.payload]
						: [action.payload, ...state.pages],
				loading: false,
			};

		case EDIT_PAGE_GO:
			return {
				...state,
				pages: state.pages.map((page) =>
					page._id === action.payload._id ? action.payload : page
				),
				loading: false,
			};

		case GET_APAGE_GO:
			return {
				...state,
				page: action.payload,
				loading: false,
			};

		case REMOVE_PAGE_GO:
			return {
				...state,
				pages: state.pages.filter((fld) => fld._id !== action.payload.id),
				msg: action.payload.msg,
				loading: false,
			};

		case GET_PAGES_FAILED:
		case GET_APAGE_FAILED:
		case ADD_PAGE_FAILED:
		case EDIT_PAGE_FAILED:
		case REMOVE_PAGE_FAILED:
			return {
				...state,
				page: null,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				page: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default Pages;
