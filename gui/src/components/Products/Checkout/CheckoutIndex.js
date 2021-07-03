import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';

import {
	removeFromCart,
	changeCartValue,
	clearCart,
} from '../../../store/actions/cart/cartActions';
import { addTransactionItems } from '../../../store/actions/transaction/transactions';
import {
	HandleDecimalPlaces,
	numberWithCommas,
} from '../../../Helpers/functions';
import PaymentCashModal from './PaymentCashModal';
import ReactToPrint from 'react-to-print';
import { ReceiptContent } from './ReceiptContent';

class CheckoutIndex extends React.Component {
	static propTypes = {
		removeFromCart: PropTypes.func.isRequired,
		changeCartValue: PropTypes.func.isRequired,
		addTransactionItems: PropTypes.func.isRequired,
		cartItems: PropTypes.array.isRequired,
	};
	state = {
		totalAmount: 0,
		Subtotal: 0,
		tax: 0,
		amount_tendered: 0,
		change: -1,
		transanction_id: 0,
		TotalQuantity: 0,
		modal: false,
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	// This will handle the submittion of data from cartItems, and state that will finish the transaction the data will go to store-action-transaction-transactions-addTransactionItems
	handleClick = (event) => {
		event.preventDefault();
		let quantity = 0;
		this.props.cartItems.map((item) => (quantity += item.quantity));
		const { totalAmount, amount_tendered, change } = this.state;
		const action_done = 'Transaction Added';
		const mode_of_payment = 'Cash';
		const items = this.props.cartItems;
		const data = {
			totalAmount,
			amount_tendered,
			change,
			quantity,
			items,
			action_done,
			mode_of_payment,
		};
		this.props.addTransactionItems(data);
		this.onModalToggleFunction();

		this.props.clearCart();
		this.props.history.push('/products');
	};
	handleClickPayPal(AmountTendered) {
		this.setState({
			amount_tendered: AmountTendered,
		});
		let quantity = 0;
		this.props.cartItems.map((item) => (quantity += item.quantity));
		const { totalAmount, amount_tendered, change } = this.state;
		const action_done = 'Transaction';
		const mode_of_payment = 'Paypal';
		const items = this.props.cartItems;
		const data = {
			totalAmount,
			amount_tendered,
			change,
			quantity,
			items,
			action_done,
			mode_of_payment,
		};
		this.props.addTransactionItems(data);
		this.onModalToggleFunction();

		this.props.clearCart();
		this.props.history.push('/products');
	}
	// This will set the amount tendered field to the user payment
	handleSetAmountTendered = (AmountTendered) => {
		return (event) => {
			event.preventDefault();
			this.setState({
				amount_tendered: AmountTendered,
			});
		};
	};

	// This will load the cart items to be rendered and also to compute for the total amount, sub total and the tax;
	componentDidMount() {
		let VariableTotalAmount = 0;
		let TotalQuantity = 0;
		this.props.cartItems.map(
			(item) => (
				(VariableTotalAmount += item.price * item.quantity),
				(TotalQuantity += item.quantity)
			)
		);
		this.setState({
			totalAmount: HandleDecimalPlaces(VariableTotalAmount),
			Subtotal: HandleDecimalPlaces(
				(VariableTotalAmount -= VariableTotalAmount * 0.12)
			),
			TotalQuantity,
			tax: HandleDecimalPlaces(VariableTotalAmount * 0.12),
		});
	}
	// This will compute the change and if the confirm payment can be clicked or not

	componentDidUpdate(prevProps, prevState) {
		if (this.state.amount_tendered !== prevState.amount_tendered) {
			this.setState({
				change: HandleDecimalPlaces(
					this.state.amount_tendered - this.state.totalAmount
				),
			});
			// console.log(this.state);
		}
	}
	onModalToggleFunction() {
		this.setState({ modal: !this.state.modal });
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		document.getElementById('Body').classList.toggle('overflow-hidden');
	}
	onModalToggle = (event) => {
		event.preventDefault();
		this.onModalToggleFunction();
	};
	render() {
		const { cartItems, removeFromCart } = this.props;
		const { Subtotal, tax, totalAmount } = this.state;
		return (
			<>
				<div class="flex-1 bg-gray-100 mt-28 md:mt-16 pb-24 md:pb-5">
					<div class="bg-gray-800 pt-3">
						<div
							class="
                    rounded-tl-3xl
                    bg-gradient-to-r
                    from-teal_custom
                    to-gray-800
                    p-4
                    shadow
                    text-2xl text-white
                "
						>
							<h3 class="font-bold pl-2">Checkout</h3>
						</div>
					</div>
					<div class="flex flex-col lg:flex-row">
						<div class="lg:mx-4 -mt-4 w-full lg:w-3/5">
							<div class="flex shadow-lg my-10">
								<div class="w-full bg-white px-10 py-10">
									<div class="flex justify-between border-b pb-8">
										<h1 class="font-semibold text-2xl">Sale Summary</h1>
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
										<div class="flex items-center justify-center hover:bg-gray-100 py-5">
											<div class="flex w-full">
												<div class="flex flex-col justify-between flex-grow h-24">
													<span class="font-bold text-sm">
														{item.product_name}
													</span>
													<span class="text-red-500 text-xs">
														{item.supplier}
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
											<span class="text-center w-full font-semibold text-sm pr-2 break-words">
												{item.quantity}
											</span>
											<span class="text-center w-full font-semibold text-sm pr-2 break-words">
												₱{item.price}
											</span>
											<span class="text-center w-full font-semibold text-sm break-words">
												${item.price * item.quantity}
											</span>
										</div>
									))}
									<div className="flex flex-col border-t pt-8 gap-y-2">
										<div class="flex justify-between">
											<h1 class="font-semibold text-lg">Sub Total : </h1>
											<h2 class="font-semibold text-xl">
												₱{numberWithCommas(Subtotal)}
											</h2>
										</div>
										<div class="flex justify-between">
											<h1 class="font-semibold text-lg">Tax : </h1>
											<h2 class="font-semibold text-xl">
												₱{numberWithCommas(tax)}
											</h2>
										</div>
										<div class="flex justify-between">
											<h1 class="font-semibold text-2xl">Total : </h1>
											<h2 class="font-semibold text-2xl">
												₱{numberWithCommas(totalAmount)}
											</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="lg:mx-4 -mt-4 w-full lg:w-2/5">
							<div class="shadow-lg my-10">
								<div class="w-full bg-white px-10 py-10">
									<div class="flex justify-between border-b pb-8">
										<h1 class="font-semibold text-2xl">Payment options</h1>
									</div>
									<div class="flex flex-col 2xl:flex-row items-center justify-between mt-5 mb-5">
										<button
											onClick={this.onModalToggle}
											class="space-x-1 w-full text-lg text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-500 hover:text-white"
										>
											<i class="block pt-3 far fa-money-bill-wave fa-lg"></i>
											<span className="block pb-3 font-semibold">Cash</span>
										</button>
										<div className="flex items-center justify-center bg-gray-100 shadow-lg z-10 rounded-xl p-4 m-3 w-full">
											<PayPalButton
												createOrder={(data, actions) => {
													return actions.order.create({
														purchase_units: [
															{
																amount: {
																	currency_code: 'PHP',
																	value: totalAmount.toString(),
																},
															},
														],
														// application_context: {
														//   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
														// }
													});
												}}
												onApprove={(data, actions) => {
													// Capture the funds from the transaction
													this.handleClickPayPal(totalAmount);
													this.onModalToggleFunction();
													return actions.order
														.capture()
														.then(function (details) {
															// Show a success message to your buyer
															alert(
																'Transaction completed by ' +
																	details.payer.name.given_name
															);

															// OPTIONAL: Call your server to save the transaction
															return fetch('/paypal-transaction-complete', {
																method: 'post',
																body: JSON.stringify({
																	orderID: data.orderID,
																}),
															});
														});
												}}
											/>
										</div>

										<button class="space-x-1 w-full text-lg text-gray-700 transition-colors duration-150 border border-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-500 hover:text-white">
											<i class="block pt-3 fad fa-gift-card fa-lg"></i>
											<span className="block pb-3 font-semibold">
												Gift check
											</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ReactToPrint
						trigger={() => {
							// NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
							// to the root node of the returned component as it will be overwritten.
							return <a href="#">Print this out!</a>;
						}}
						content={() => this.componentRef}
					/>
					;
					<div className="hidden">
						<ReceiptContent
							cartItems={cartItems}
							Subtotal={numberWithCommas(Subtotal)}
							tax={numberWithCommas(tax)}
							totalAmount={numberWithCommas(totalAmount)}
							user={this.props.AuthReducer.user}
							ref={(el) => (this.componentRef = el)}
						/>
						;
					</div>
				</div>
				<PaymentCashModal
					state={this.state}
					onChange={this.onChange}
					handleSetAmountTendered={this.handleSetAmountTendered}
					handleClick={this.handleClick}
					onModalToggle={this.onModalToggle}
				/>
			</>
		);
	}
}
const mapToStateToProps = (state) => ({
	cartItems: state.cartReducer.cartItems,
	AuthReducer: state.AuthReducer,
});
export default connect(mapToStateToProps, {
	removeFromCart,
	changeCartValue,
	addTransactionItems,
	clearCart,
})(CheckoutIndex);
