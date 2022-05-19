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

const initialState = {
	folders: [],
	folder: null,
	loading: false,
	error: null,
	filtered: null,
	msg: null,
};

const Folders = (state = initialState, action) => {
	switch (action.type) {
		case GET_FOLDERS_TRY:
		case GET_AFOLDER_TRY:
		case ADD_FOLDER_TRY:
		case EDIT_FOLDER_TRY:
		case REMOVE_FOLDER_TRY:
			return {
				...state,
				loading: true,
			};

		case GET_FOLDERS_GO:
			return {
				...state,
				folders: action.payload,
				loading: false,
			};

		case ADD_FOLDER_GO:
			return {
				...state,
				folders: [action.payload, ...state.folders],
				loading: false,
			};

		case EDIT_FOLDER_GO:
			return {
				...state,
				folders: state.folders.map((folder) =>
					folder._id === action.payload._id ? action.payload : folder
				),
				loading: false,
			};

		case GET_AFOLDER_GO:
			return {
				...state,
				folder: action.payload,
				loading: false,
			};

		case REMOVE_FOLDER_GO:
			return {
				...state,
				folders: state.folders.filter((fld) => fld._id !== action.payload.id),
				msg: action.payload.msg,
				loading: false,
			};

		case FILTER_ITEMS:
			return {
				...state,
				filtered: state.folders.filter((folder) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return folder.fmtitle.match(regex) || folder.title.match(regex);
				}),
			};

		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};

		case GET_FOLDERS_FAILED:
		case GET_AFOLDER_FAILED:
		case ADD_FOLDER_FAILED:
		case EDIT_FOLDER_FAILED:
		case REMOVE_FOLDER_FAILED:
			return {
				...state,
				folder: null,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				folder: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default Folders;
