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

const initialState = {
	categories: [],
	category: null,
	loading: false,
	error: null,
	filtered: null,
	msg: null,
};

const Categories = (state = initialState, action) => {
	switch (action.type) {
		case GET_CATEGORIES_TRY:
		case GET_ACATEGORY_TRY:
		case ADD_CATEGORY_TRY:
		case EDIT_CATEGORY_TRY:
		case REMOVE_CATEGORY_TRY:
			return {
				...state,
				loading: true,
			};

		case GET_CATEGORIES_GO:
			return {
				...state,
				categories: action.payload,
				loading: false,
			};

		case ADD_CATEGORY_GO:
			return {
				...state,
				categories: [action.payload, ...state.categories],
				loading: false,
			};

		case EDIT_CATEGORY_GO:
			return {
				...state,
				categories: state.categories.map((category) =>
					category._id === action.payload._id ? action.payload : category
				),
				loading: false,
			};

		case GET_ACATEGORY_GO:
			return {
				...state,
				category: action.payload,
				loading: false,
			};

		case REMOVE_CATEGORY_GO:
			return {
				...state,
				categories: state.categories.filter(
					(cat) => cat._id !== action.payload.id
				),
				msg: action.payload.msg,
				loading: false,
			};

		case FILTER_ITEMS:
			return {
				...state,
				filtered: state.categories.filter((category) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return category.fmtitle.match(regex) || category.title.match(regex);
				}),
			};

		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};

		case GET_CATEGORIES_FAILED:
		case GET_ACATEGORY_FAILED:
		case ADD_CATEGORY_FAILED:
		case EDIT_CATEGORY_FAILED:
		case REMOVE_CATEGORY_FAILED:
			return {
				...state,
				category: null,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				category: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default Categories;
