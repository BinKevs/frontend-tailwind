import axios from 'axios';
import { URL_IMPORT } from '../../../Helpers/constant';
import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	GET_ACCOUNT_LIST,
	GET_ACTIVITY_LOG_LIST,
	GET_ATTENDANCE_LOG_LIST,
} from './types';
import swal from 'sweetalert';
export const loadUser = () => (dispatch, getState) => {
	dispatch({ type: USER_LOADING });
	axios
		.get(URL_IMPORT + '/api/auth/user', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: AUTH_ERROR,
			});
		});
};
export const login = (username, password) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify({ username, password });
	axios
		.post(URL_IMPORT + '/api/auth/login', body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
			swal({
				title: 'Authentication failed',
				text: 'Sorry, we could not find an account with that username and email. Please try again. :)',
				icon: 'error',
			});
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};
export const register =
	({ username, password, email, first_name, last_name }) =>
	(dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({
			username,
			password,
			email,
			first_name,
			last_name,
		});
		axios
			.post(URL_IMPORT + '/api/auth/register', body, config)
			.then((res) => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: REGISTER_FAIL,
				});
			});
	};
export const logout = () => (dispatch, getState) => {
	axios
		.post(URL_IMPORT + '/api/auth/logout/', null, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
export const tokenConfig = (getState) => {
	// Get token from state
	const token = getState().AuthReducer.token;

	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// If token, add to headers config
	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	return config;
};

// Account setting fetching account list
export const getAccountList = () => (dispatch, getState) => {
	axios
		.get(URL_IMPORT + '/api/accounts/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_ACCOUNT_LIST,
				payload: res.data,
			});
		});
};

// Fetching activity log
export const getActivityLogList = () => (dispatch, getState) => {
	axios
		.get(URL_IMPORT + '/api/activity_log/?ordering=-id', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_ACTIVITY_LOG_LIST,
				payload: res.data,
			});
		});
};

// Fetching attendance log
export const getAttendanceLogList = () => (dispatch, getState) => {
	axios
		.get(
			URL_IMPORT + '/api/attendance_log/?ordering=-id',
			tokenConfig(getState)
		)
		.then((res) => {
			dispatch({
				type: GET_ATTENDANCE_LOG_LIST,
				payload: res.data,
			});
		});
};
