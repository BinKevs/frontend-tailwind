import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHANGE_QUANTITY,
	CLEAR_CART,
} from '../../actions/cart/types.js';
export const cartReducer = (
	state = { cartItems: JSON.parse(localStorage.getItem('cartItem') || '[]') },
	action
) => {
	switch (action.type) {
		case ADD_TO_CART:
		case CHANGE_QUANTITY:
		case REMOVE_FROM_CART:
			return { cartItems: action.payload.cartItems };
		case CLEAR_CART:
			return { cartItems: [] };
		default:
			return state;
	}
};
