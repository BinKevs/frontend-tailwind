import { combineReducers } from 'redux';
import products from './product/products';
import suppliers from './supplier/suppliers';
import AuthReducer from './account/auth';
import { cartReducer } from './cart/cartReducers';
import transactions from './transaction/transactions';
import inventories from './inventory/inventories';
export default combineReducers({
	products,
	AuthReducer,
	cartReducer,
	suppliers,
	transactions,
	inventories,
});
