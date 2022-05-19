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

const initialState = {
	blogposts: [],
	blogpost: null,
	loading: false,
	error: null,
	msg: null,
};

const Blogposts = (state = initialState, action) => {
	switch (action.type) {
		case GET_BLOGPOSTS_TRY:
		case GET_ABLOGPOST_TRY:
		case ADD_BLOGPOST_TRY:
		case EDIT_BLOGPOST_TRY:
		case REMOVE_BLOGPOST_TRY:
			return {
				...state,
				loading: true,
			};

		case GET_BLOGPOSTS_GO:
			return {
				...state,
				blogposts: action.payload,
				loading: false,
			};

		case ADD_BLOGPOST_GO:
			return {
				...state,
				blogposts: [action.payload, ...state.blogposts],
				loading: false,
			};

		case EDIT_BLOGPOST_GO:
			return {
				...state,
				blogposts: state.blogposts.map((blogpost) =>
					blogpost._id === action.payload._id ? action.payload : blogpost
				),
				loading: false,
			};

		case GET_ABLOGPOST_GO:
			return {
				...state,
				blogpost: action.payload,
				loading: false,
			};

		case REMOVE_BLOGPOST_GO:
			return {
				...state,
				blogposts: state.blogposts.filter(
					(fld) => fld._id !== action.payload.id
				),
				msg: action.payload.msg,
				loading: false,
			};

		case GET_BLOGPOSTS_FAILED:
		case GET_ABLOGPOST_FAILED:
		case ADD_BLOGPOST_FAILED:
		case EDIT_BLOGPOST_FAILED:
		case REMOVE_BLOGPOST_FAILED:
			return {
				...state,
				blogpost: null,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				blogpost: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default Blogposts;
