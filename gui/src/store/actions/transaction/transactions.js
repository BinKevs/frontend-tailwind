import axios from 'axios';
import { URL_IMPORT } from '../../../Helpers/constant';
import { tokenConfig } from '../account/auth';
import {
	GET_TRANSACTION_LIST,
	GET_TRANSACTION,
	DELETE_TRANSACTION,
	ADD_TRANSACTION,
	UPDATE_TRANSACTION,
	ADD_TRANSACTION_ITEMS,
	GET_TRANSACTION_ITEM_LIST,
} from './actionTypes';
const url = URL_IMPORT + '/api/transactions/';
export const getTransactionList = () => (dispatch, getState) => {
	axios
		.get(url + '?ordering=-created_at', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_TRANSACTION_LIST,
				payload: res.data,
			});
		});
};

export const getTransaction = (TransactionID) => (dispatch, getState) => {
	axios
		.get(url + TransactionID + '/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_TRANSACTION,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const deleteTransaction = (TransactionID) => (dispatch, getState) => {
	axios
		.delete(url + TransactionID + '/', tokenConfig(getState))
		.then((res) => {
			console.log('Transaction Deleted');
			dispatch({
				type: DELETE_TRANSACTION,
				payload: TransactionID,
			});
		})
		.catch((err) => console.log(err));
};

export const updateTransaction =
	(TransactionID, data) => (dispatch, getState) => {
		axios
			.put(url + TransactionID + '/', data, tokenConfig(getState))
			.then((res) => {
				console.log('Transaction Updated');
				dispatch({
					type: UPDATE_TRANSACTION,
					payload: res.data,
				});
			})
			.catch((err) => console.log(err));
	};

// Transaction Items part
export const getTransactionItemList = () => (dispatch, getState) => {
	axios
		.get(
			URL_IMPORT + '/api/transactions/items/?ordering=-id',
			tokenConfig(getState)
		)
		.then((res) => {
			dispatch({
				type: GET_TRANSACTION_ITEM_LIST,
				payload: res.data,
			});
		});
};

// Sending the transaction items together with the transaction information such as amount rendered, change, total amount and quantity

export const addTransactionItems = (data) => (dispatch, getState) => {
	axios
		.post(URL_IMPORT + '/api/transactions/items/', data, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: ADD_TRANSACTION_ITEMS,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
