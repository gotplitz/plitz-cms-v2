import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	TRY_LOGIN,
	USER_LOGOUT,
	REGISTER_TRY,
	REGISTERING_USER,
	REGISTER_FAILED,
	CHANGEPASS_TRY,
	CHANGEPASS_GO,
	CHANGEPASS_FAILED,
	NEWPASS_TRY,
	NEWPASS_GO,
	NEWPASS_FAILED,
} from './actionTypes';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: false,
	users: [],
	user: null,
	alreadyin: false,
	error: null,
};

const Login = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_TRY:
		case CHANGEPASS_TRY:
		case NEWPASS_TRY:
		case TRY_LOGIN:
			return {
				...state,
				...action.payload,
				loading: true,
			};

		case REGISTERING_USER:
		case NEWPASS_GO:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.data.token);

			return {
				...state,
				isAuthenticated: true,
				user: action.payload.data,
				loading: false,
			};

		case CHANGEPASS_GO:
			return {
				...state,
				loading: false,
				msg: action.payload,
			};

		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
				alreadyin: true,
			};

		case REGISTER_FAILED:
		case CHANGEPASS_FAILED:
		case LOGIN_FAIL:
		case NEWPASS_FAILED:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};

		case USER_LOGOUT:
			localStorage.removeItem('token');

			return {
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};

		default:
			return state;
	}
};

export default Login;
