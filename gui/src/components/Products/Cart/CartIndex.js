import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	removeFromCart,
	changeCartValue,
} from '../../../store/actions/cart/cartActions';

class CartIndex extends React.Component {
	static propTypes = {
		removeFromCart: PropTypes.func.isRequired,
		changeCartValue: PropTypes.func.isRequired,
		cartItems: PropTypes.array.isRequired,
	};
	state = {
		totalAmount: 0,
		Subtotal: 0,
		tax: 0,
		quantity: 0,
	};

	trimmedString(stringX) {
		if (stringX.length === 12) {
			return stringX;
		} else {
			return stringX.substring(0, 24) + '...';
		}
	}
	// When the quantity fields change, this function will change the quantity state value and take a item product id to be pass to store-actions-cartAction-
	// changeCartValue together with type,id(or the product id) and the value
	onChange(id) {
		return (event) => {
			this.props.changeCartValue('type', id, event.target.value);
			this.setState({ [this.state.quantity]: event.target.value });
		};
	}

	HandleDecimalPlaces = (Variable) => {
		return Math.round((Variable + Number.EPSILON) * 100) / 100;
	};

	numberWithCommas(x) {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}
	// On component load or the app load it will look for the cartItems values from cartReducer *The cartReducer is always check if there are any values from local storage and store it to state*
	// and this CDM get the props pass by cartReducer to render it and compute for totalAmount, sub amount and tax.
	componentDidMount() {
		let VariableTotalAmount = 0;
		let Variablequantity = 0;
		this.props.cartItems.map(
			(item) => (
				(VariableTotalAmount += item.price * item.quantity),
				(Variablequantity += item.quantity)
			)
		);
		this.setState({
			totalAmount: this.HandleDecimalPlaces(VariableTotalAmount),
			Subtotal: this.HandleDecimalPlaces(
				(VariableTotalAmount -= VariableTotalAmount * 0.12)
			),
			tax: this.HandleDecimalPlaces(VariableTotalAmount * 0.12),
			quantity: Variablequantity,
		});
	}
	// This component did update will watch over the props from cartReducer so if the user changes
	//the quantity or delete it the component will update what to render and compute the total amount, subtotal, and tax automatically
	componentDidUpdate(prevProps) {
		if (this.props.cartItems !== prevProps.cartItems) {
			let VariableTotalAmount = 0;
			let Variablequantity = 0;
			this.props.cartItems.map(
				(item) => (
					(VariableTotalAmount += item.price * item.quantity),
					(Variablequantity += item.quantity)
				)
			);
			this.setState({
				totalAmount: this.HandleDecimalPlaces(VariableTotalAmount),
				Subtotal: this.HandleDecimalPlaces(
					(VariableTotalAmount -= VariableTotalAmount * 0.12)
				),
				tax: this.HandleDecimalPlaces(VariableTotalAmount * 0.12),
				quantity: Variablequantity,
			});
		}
	}
	render() {
		const { cartItems, changeCartValue, removeFromCart } = this.props;
		const { Subtotal, tax, totalAmount, quantity } = this.state;
		return (
			<>
				<div class="lg:mx-4 -mt-4 w-full lg:w-2/5">
					<div class="flex shadow-lg my-10 h-cart">
						<div class="w-full bg-white px-10 py-10">
							<div class="flex justify-between border-b pb-8">
								<h1 class="font-semibold text-2xl">Shopping Cart</h1>
								<h2 class="font-semibold text-2xl">{quantity} Items</h2>
							</div>
							<div class="flex justify-between mt-10 mb-5">
								<h3 class="font-semibold text-gray-600 text-xs uppercase w-full">
									Product Details
								</h3>
								<h3 class="font-semibold text-gray-600 text-xs uppercase w-full text-center">
									Quantity
								</h3>
								<h3 class="font-semibold text-gray-600 text-xs uppercase w-full text-center">
									Price
								</h3>
								<h3 class="font-semibold text-gray-600 text-xs uppercase w-full text-center">
									Total
								</h3>
							</div>
							{cartItems.map((item) => (
								<div class=" flex items-center justify-between hover:bg-gray-100 py-5">
									<>
										<div class="flex w-full">
											<div class="HoverCartProductName flex flex-col justify-between flex-grow h-24 relative">
												<span class="font-bold text-sm">
													{/* {item.product_name} */}
													{this.trimmedString(item.product_name)}
													<div className="CartProductName bg-gray-100 absolute top-0 z-10 w-full">
														{item.product_name}
													</div>
												</span>
												<span class="text-red-500 text-xs">
													{this.trimmedString(item.supplier)}
												</span>
												<div
													href="#"
													class="font-semibold hover:text-red-500 text-gray-500 text-xs"
													onClick={() => removeFromCart(item)}
												>
													Remove
												</div>
											</div>
										</div>

										<div class="flex xl:flex-row lg:flex-col items-center justify-between w-full h-24 my-1">
											<i
												class="fal fa-minus xl:order-first lg:order-last fill-current text-gray-600 w-3"
												onClick={() => {
													changeCartValue('minus', item.product_id, item);
												}}
											></i>
											<input
												class="mx-2 border text-center w-14 rounded-md"
												type="text"
												value={item.quantity}
												onChange={this.onChange(item.product_id)}
											/>
											<i
												class="fal fa-plus xl:order-last lg:order-first fill-current text-gray-600 w-3"
												onClick={() => {
													changeCartValue('plus', item.product_id);
												}}
											></i>
										</div>
										<span class="text-center w-full font-semibold text-sm pr-2 break-words">
											₱{item.price}
										</span>
										<span class="text-center w-full font-semibold text-sm break-words">
											${item.price * item.quantity}
										</span>
									</>
								</div>
							))}
							{/* <a
										href="#"
										class="flex font-semibold text-indigo-600 text-sm mt-10"
									>
										<svg
											class="fill-current mr-2 text-indigo-600 w-4"
											viewBox="0 0 448 512"
										>
											<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
										</svg>
										Continue Shopping
									</a> */}
							<div className="flex flex-col border-t pt-8 gap-y-2">
								<div class="flex justify-between">
									<h1 class="font-semibold text-lg">Sub Total : </h1>
									<h2 class="font-semibold text-xl">
										₱{this.numberWithCommas(Subtotal)}
									</h2>
								</div>
								<div class="flex justify-between">
									<h1 class="font-semibold text-lg">Tax : </h1>
									<h2 class="font-semibold text-xl">
										₱{this.numberWithCommas(tax)}
									</h2>
								</div>
								<div class="flex justify-between">
									<h1 class="font-semibold text-2xl">Total : </h1>
									<h2 class="font-semibold text-2xl">
										₱{this.numberWithCommas(totalAmount)}
									</h2>
								</div>
								<Link to="checkout">
									<button
										class="
							bg-teal_custom 
							font-semibold
							py-3
							mt-2
							text-sm text-white
							uppercase
							w-full
							rounded-lg
						"
									>
										Checkout
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

// get cartItems from cartReducer
const mapToStateToProps = (state) => ({
	cartItems: state.cartReducer.cartItems,
});
export default connect(mapToStateToProps, {
	removeFromCart,
	changeCartValue,
})(CartIndex);
