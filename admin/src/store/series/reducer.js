import {
	ADD_SERIE_FAILED,
	ADD_SERIE_GO,
	ADD_SERIE_TRY,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	EDIT_SERIE_FAILED,
	EDIT_SERIE_GO,
	EDIT_SERIE_TRY,
	FILTER_ITEMS,
	GET_ASERIE_FAILED,
	GET_ASERIE_GO,
	GET_ASERIE_TRY,
	GET_SERIES_FAILED,
	GET_SERIES_GO,
	GET_SERIES_TRY,
	REMOVE_SERIE_FAILED,
	REMOVE_SERIE_GO,
	REMOVE_SERIE_TRY,
} from './actionTypes';

const initialState = {
	series: [],
	serie: null,
	loading: false,
	error: null,
	filtered: null,
	msg: null,
};

const Series = (state = initialState, action) => {
	switch (action.type) {
		case GET_SERIES_TRY:
		case GET_ASERIE_TRY:
		case ADD_SERIE_TRY:
		case EDIT_SERIE_TRY:
		case REMOVE_SERIE_TRY:
			return {
				...state,
				loading: true,
			};

		case GET_SERIES_GO:
			return {
				...state,
				series: action.payload,
				loading: false,
			};

		case ADD_SERIE_GO:
			return {
				...state,
				series: [action.payload, ...state.series],
				loading: false,
			};

		case EDIT_SERIE_GO:
			return {
				...state,
				series: state.series.map((serie) =>
					serie._id === action.payload._id ? action.payload : serie
				),
				loading: false,
			};

		case GET_ASERIE_GO:
			return {
				...state,
				serie: action.payload,
				loading: false,
			};

		case REMOVE_SERIE_GO:
			return {
				...state,
				series: state.series.filter((ser) => ser._id !== action.payload.id),
				msg: action.payload.msg,
				loading: false,
			};

		case FILTER_ITEMS:
			return {
				...state,
				filtered: state.series.filter((serie) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return serie.fmtitle.match(regex) || serie.title.match(regex);
				}),
			};

		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};

		case GET_SERIES_FAILED:
		case GET_ASERIE_FAILED:
		case ADD_SERIE_FAILED:
		case EDIT_SERIE_FAILED:
		case REMOVE_SERIE_FAILED:
			return {
				...state,
				serie: null,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				serie: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default Series;
