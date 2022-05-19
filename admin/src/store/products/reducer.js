import {
	ADD_PRODUCT_FAILED,
	ADD_PRODUCT_GO,
	ADD_PRODUCT_TRY,
	CLEAR_CURRENT,
	EDIT_PRODUCT_FAILED,
	EDIT_PRODUCT_GO,
	EDIT_PRODUCT_TRY,
	GET_APRODUCT_FAILED,
	GET_APRODUCT_GO,
	GET_APRODUCT_TRY,
	GET_PREVPROD_FAILED,
	GET_PREVPROD_GO,
	GET_PREVPROD_TRY,
	GET_PRODUCTS_FAILED,
	GET_PRODUCTS_GO,
	GET_PRODUCTS_TRY,
	REMOVE_PRODUCT_FAILED,
	REMOVE_PRODUCT_GO,
	REMOVE_PRODUCT_TRY,
} from './actionTypes';

const initialState = {
	products: [],
	previews: [],
	product: null,
	loading: false,
	error: null,
	msg: null,
};

const Products = (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS_TRY:
		case GET_APRODUCT_TRY:
		case GET_PREVPROD_TRY:
		case ADD_PRODUCT_TRY:
		case EDIT_PRODUCT_TRY:
		case REMOVE_PRODUCT_TRY:
			return {
				...state,
				loading: true,
			};

		case GET_PRODUCTS_GO:
			return {
				...state,
				products: action.payload,
				loading: false,
			};

		case ADD_PRODUCT_GO:
			return {
				...state,
				products: [action.payload, ...state.products],
				loading: false,
			};

		case GET_PREVPROD_GO:
			return {
				...state,
				previews: action.payload,
				loading: false,
			};

		case EDIT_PRODUCT_GO:
			return {
				...state,
				products: state.products.map((product) =>
					product._id === action.payload._id ? action.payload : product
				),
				loading: false,
			};

		case GET_APRODUCT_GO:
			return {
				...state,
				product: action.payload,
				loading: false,
			};

		case REMOVE_PRODUCT_GO:
			return {
				...state,
				products: state.products.filter((fld) => fld._id !== action.payload.id),
				previews: state.previews.filter((fld) => fld._id !== action.payload.id),
				msg: action.payload.msg,
				loading: false,
			};

		case GET_PRODUCTS_FAILED:
		case GET_APRODUCT_FAILED:
		case GET_PREVPROD_FAILED:
		case ADD_PRODUCT_FAILED:
		case EDIT_PRODUCT_FAILED:
		case REMOVE_PRODUCT_FAILED:
			return {
				...state,
				product: null,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				product: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default Products;
