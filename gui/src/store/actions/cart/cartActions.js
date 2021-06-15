import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHANGE_QUANTITY,
	CLEAR_CART,
} from './types';

// This will receive the product that will be store in the cart/local storage when an id exist in local storage it will just add the quantity
export const addToCart = (product) => (dispatch, getState) => {
	const cartItems = getState().cartReducer.cartItems.slice();
	let alreadyExists = false;
	cartItems.forEach((x) => {
		if (x.product_id === product.product_id) {
			alreadyExists = true;
			x.quantity++;
		}
	});
	if (!alreadyExists) {
		cartItems.push({ ...product, quantity: 1 });
	}
	dispatch({
		type: ADD_TO_CART,
		payload: { cartItems },
	});
	localStorage.setItem('cartItem', JSON.stringify(cartItems));
};
// This is the changeCartValue Action that will receive the type,id(or product id) and product value from containers-Cart-cart.js
// where this will be the one whose responsible for changing the value in the local storage for the other component to access it
// freely so when the type is plus it will increament minus for decrement and "type" when the value of quantity is indicated
// and dispatch the new cartItems value to the reducer to be pass on the component to render new value
export const changeCartValue =
	(changeType, product_id, product_current_value) => (dispatch, getState) => {
		const cartItems = getState().cartReducer.cartItems.slice();
		cartItems.forEach((x) => {
			if (x.product_id === product_id) {
				if (changeType === 'plus') x.quantity++;
				else if (changeType === 'minus') x.quantity--;
				else if (changeType === 'type') x.quantity = product_current_value;
			}
		});

		dispatch({
			type: CHANGE_QUANTITY,
			payload: { cartItems },
		});
		localStorage.setItem('cartItem', JSON.stringify(cartItems));
	};

// remove an item in the cart setting the local storage without the product item that has been passed!
export const removeFromCart = (product) => (dispatch, getState) => {
	const cartItems = getState()
		.cartReducer.cartItems.slice()
		.filter((x) => x.product_id !== product.product_id);
	dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
	localStorage.setItem('cartItem', JSON.stringify(cartItems));
};
// When a checkout and payment successfully done local storage will be clear automatically with this.
export const clearCart = () => (dispatch) => {
	localStorage.clear();
	dispatch({ type: CLEAR_CART });
};
