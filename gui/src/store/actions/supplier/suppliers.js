import axios from 'axios';
import { URL_IMPORT } from '../../../Helpers/constant';
import { tokenConfig } from '../account/auth';
import {
	GET_SUPPLIER_LIST,
	GET_SUPPLIER,
	DELETE_SUPPLIER,
	ADD_SUPPLIER,
	UPDATE_SUPPLIER,
	GET_SUPPLIER_LIST_WITH_PAGINATION,
} from './actionTypes';
let url = URL_IMPORT + '/api/suppliers/';
let urlWithPagination = 'http://127.0.0.1:8000/api/suppliers/withPagination/';

export const movePagination = (urlSent) => (dispatch, getState) => {
	axios
		.get(urlSent, tokenConfig(getState))
		.then((res) => {
			urlWithPagination = urlSent;
			dispatch({
				type: GET_SUPPLIER_LIST_WITH_PAGINATION,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const getSupplierListWithPagination = () => (dispatch, getState) => {
	axios
		.get(urlWithPagination, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_SUPPLIER_LIST_WITH_PAGINATION,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const getSupplierList = () => (dispatch, getState) => {
	axios
		.get(url, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_SUPPLIER_LIST,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const getSupplier = (SupplierID) => (dispatch, getState) => {
	axios
		.get(url + SupplierID + '/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_SUPPLIER,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const deleteSupplier = (SupplierID) => (dispatch, getState) => {
	axios
		.delete(url + SupplierID + '/', tokenConfig(getState))
		.then((res) => {
			console.log('Supplier Deleted');
			dispatch({
				type: DELETE_SUPPLIER,
				payload: SupplierID,
			});
		})
		.catch((err) => console.log(err));
};
export const addSupplier = (data) => (dispatch, getState) => {
	axios
		.post(url, data, tokenConfig(getState))
		.then((res) => {
			console.log('Supplier Added');
			dispatch({
				type: ADD_SUPPLIER,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const updateSupplier = (SupplierID, data) => (dispatch, getState) => {
	axios
		.put(url + SupplierID + '/', data, tokenConfig(getState))
		.then((res) => {
			console.log('Supplier Updated');
			dispatch({
				type: UPDATE_SUPPLIER,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};