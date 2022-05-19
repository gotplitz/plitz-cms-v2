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

const initialState = {
	noticias: [],
	noticia: null,
	loading: false,
	error: null,
	msg: null,
};

const Noticias = (state = initialState, action) => {
	switch (action.type) {
		case GET_NOTICIAS_TRY:
		case GET_ANOTICIA_TRY:
		case ADD_NOTICIA_TRY:
		case EDIT_NOTICIA_TRY:
		case REMOVE_NOTICIA_TRY:
			return {
				...state,
				loading: true,
			};

		case GET_NOTICIAS_GO:
			return {
				...state,
				noticias: action.payload,
				loading: false,
			};

		case ADD_NOTICIA_GO:
			return {
				...state,
				noticias: [action.payload, ...state.noticias],
				loading: false,
			};

		case EDIT_NOTICIA_GO:
			return {
				...state,
				noticias: state.noticias.map((noticia) =>
					noticia._id === action.payload._id ? action.payload : noticia
				),
				loading: false,
			};

		case GET_ANOTICIA_GO:
			return {
				...state,
				noticia: action.payload,
				loading: false,
			};

		case REMOVE_NOTICIA_GO:
			return {
				...state,
				noticias: state.noticias.filter((fld) => fld._id !== action.payload.id),
				msg: action.payload.msg,
				loading: false,
			};

		case GET_NOTICIAS_FAILED:
		case GET_ANOTICIA_FAILED:
		case ADD_NOTICIA_FAILED:
		case EDIT_NOTICIA_FAILED:
		case REMOVE_NOTICIA_FAILED:
			return {
				...state,
				noticia: null,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				noticia: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default Noticias;
