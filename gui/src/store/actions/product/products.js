import axios from 'axios';
import { URL_IMPORT } from '../../../Helpers/constant';
import { tokenConfig } from '../account/auth';
import {
	GET_PRODUCT_LIST,
	GET_PRODUCT,
	DELETE_PRODUCT,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	GET_CATEGORY_LIST,
	ADD_CATEGORY,
	DELETE_CATEGORY,
	PRODUCT_LOADING,
} from './actionTypes';
import { HandleSuccessMessages } from '../../../Helpers/functions';
const url = URL_IMPORT + '/api/products/';
export const getProductList = () => (dispatch, getState) => {
	dispatch({ type: PRODUCT_LOADING });
	axios.get(url, tokenConfig(getState)).then((res) => {
		dispatch({
			type: GET_PRODUCT_LIST,
			payload: res.data,
		});
	});
};
export const getProduct = (ProductID) => (dispatch, getState) => {
	axios
		.get(url + ProductID + '/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_PRODUCT,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const deleteProduct = (ProductID) => (dispatch, getState) => {
	axios
		.delete(url + ProductID + '/', tokenConfig(getState))
		.then((res) => {
			console.log('Product Deleted');
			dispatch({
				type: DELETE_PRODUCT,
				payload: ProductID,
			});
		})
		.catch((err) => console.log(err));
};
export const addProduct = (data) => (dispatch, getState) => {
	axios
		.post(url, data, tokenConfig(getState))
		.then((res) => {
			HandleSuccessMessages('Product Added', 'success');
			dispatch({
				type: ADD_PRODUCT,
				payload: res.data,
			});
		})
		.catch((err) =>
			// swal({
			// 	title: 'Product Added Failed',
			// 	text: 'Error : ' + err,
			// 	icon: 'error',
			// })
			console.log(err)
		);
};
export const updateProduct = (ProductID, data) => (dispatch, getState) => {
	axios
		.put(url + ProductID + '/', data, tokenConfig(getState))
		.then((res) => {
			HandleSuccessMessages('Product Updated', 'success');
			dispatch({
				type: UPDATE_PRODUCT,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};

// Category part

export const getCategoryList = () => (dispatch, getState) => {
	axios
		.get(URL_IMPORT + '/api/categories/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_CATEGORY_LIST,
				payload: res.data,
			});
		});
};
export const addCategory = (data) => (dispatch, getState) => {
	axios
		.post(URL_IMPORT + '/api/categories/', data, tokenConfig(getState))
		.then((res) => {
			HandleSuccessMessages('Category Added', 'success');
			dispatch({
				type: ADD_CATEGORY,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const deleteCategory = (CategoryID) => (dispatch, getState) => {
	axios
		.delete(
			URL_IMPORT + '/api/categories/' + CategoryID + '/',
			tokenConfig(getState)
		)
		.then((res) => {
			console.log('Category Deleted');
			dispatch({
				type: DELETE_CATEGORY,
				payload: CategoryID,
			});
		})
		.catch((err) => console.log(err));
};
