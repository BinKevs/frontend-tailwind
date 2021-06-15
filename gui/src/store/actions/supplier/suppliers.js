import axios from 'axios';
import { URL_IMPORT } from '../../../Helpers/constant';
import { tokenConfig } from '../account/auth';
import {
	GET_SUPPLIER_LIST,
	GET_SUPPLIER,
	DELETE_SUPPLIER,
	ADD_SUPPLIER,
	UPDATE_SUPPLIER,
} from './actionTypes';
const url = URL_IMPORT + '/api/suppliers/';
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
