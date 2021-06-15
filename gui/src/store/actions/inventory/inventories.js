import axios from 'axios';
import { URL_IMPORT } from '../../../Helpers/constant';
import { tokenConfig } from '../account/auth';
import {
	GET_INVENTORY_LIST,
	GET_INVENTORY,
	DELETE_INVENTORY,
	ADD_INVENTORY,
	UPDATE_INVENTORY,
} from './actionTypes';
const url = URL_IMPORT + '/api/inventories';
export const getInventoryList = () => (dispatch, getState) => {
	axios
		.get(url + '?ordering=-created_at', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_INVENTORY_LIST,
				payload: res.data,
			});
		});
};
export const getInventory = (InventoryID) => (dispatch, getState) => {
	axios
		.get(url + InventoryID + '/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_INVENTORY,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const deleteInventory = (InventoryID) => (dispatch, getState) => {
	axios
		.delete(url + InventoryID + '/', tokenConfig(getState))
		.then((res) => {
			console.log('Inventory Deleted');
			dispatch({
				type: DELETE_INVENTORY,
				payload: InventoryID,
			});
		})
		.catch((err) => console.log(err));
};
export const addInventory = (data) => (dispatch, getState) => {
	axios
		.post(url, data, tokenConfig(getState))
		.then((res) => {
			console.log('Inventory Added');
			dispatch({
				type: ADD_INVENTORY,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
export const updateInventory = (InventoryID, data) => (dispatch, getState) => {
	axios
		.put(url + InventoryID + '/', data, tokenConfig(getState))
		.then((res) => {
			console.log('Inventory Updated');
			dispatch({
				type: UPDATE_INVENTORY,
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
