import {
	GET_SUPPLIER_LIST,
	GET_SUPPLIER,
	DELETE_SUPPLIER,
	ADD_SUPPLIER,
	UPDATE_SUPPLIER,
} from '../../actions/supplier/actionTypes';
const initialState = {
	suppliers: [],
	supplier: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SUPPLIER_LIST:
			return {
				...state,
				suppliers: action.payload,
			};
		case GET_SUPPLIER:
			return {
				...state,
				supplier: action.payload,
			};
		case DELETE_SUPPLIER:
			return {
				...state,
				suppliers: state.suppliers.filter(
					(supplier) => supplier.id !== action.payload
				),
			};
		case ADD_SUPPLIER:
			return {
				...state,
				suppliers: [...state.suppliers, action.payload],
			};
		case UPDATE_SUPPLIER:
			return {
				...state,
				supplier: action.payload,
			};
		default:
			return state;
	}
}
