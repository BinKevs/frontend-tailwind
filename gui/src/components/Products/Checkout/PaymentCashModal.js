import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../../../Helpers/functions';
const PaymentCashModal = (props) => {
	const { onChange, handleSetAmountTendered, handleClick, onModalToggle } =
		props;
	const { totalAmount, amount_tendered, change, id, modal } = props.state;
	return (
		<>
			<div class={modal ? 'h-screen ' : 'h-screen hidden'}>
				<div class="mx-auto max-w-screen-lg h-full">
					<div
						className="z-20 absolute top-0 right-0 bottom-0 left-0"
						id="modal"
					>
						<div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
						<div className="h-full overflow-auto w-full flex flex-col">
							<div className="m-2 md:m-12">
								<div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
									<div className="flex items-center justify-center w-full">
										<h1 className="text-center text-gray-500 dark:text-gray-100 text-2xl font-bold tracking-normal leading-tight mb-4">
											Cash Payment
										</h1>
									</div>
									<div className="flex items-center justify-center w-full">
										<h1 className="text-center text-gray-800 dark:text-gray-100 text-2xl font-bold tracking-normal leading-tight mb-4 mr-2  ">
											Total amount to pay :
										</h1>
										<h1 className="text-center text-gray-800 dark:text-gray-100 text-2xl font-bold tracking-normal leading-tight mb-4">
											₱<strong>{numberWithCommas(totalAmount)}</strong>
										</h1>
									</div>
									<div class="relative z-0 w-full mb-5">
										<input
											type="text"
											onChange={onChange}
											value={amount_tendered > 0 ? amount_tendered : ''}
											name="amount_tendered"
											placeholder=" "
											required
											class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200 text-2xl"
										/>
										<label
											for="amount tendered"
											class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
										>
											Amount tendered
										</label>
										<span class="text-sm text-red-600 hidden" id="error">
											Amount tendered is required
										</span>
									</div>

									<div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-2  lg:space-x-4 lg:space-y-0">
										<button
											type="button"
											onClick={handleSetAmountTendered(totalAmount)}
											className="w-full focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 hover:text-white bg-gray-200 rounded text-gray-800 px-8 py-2 text-lg"
										>
											₱
											<strong className="ml-1">
												{numberWithCommas(totalAmount)}
											</strong>
										</button>
										<button
											type="button"
											onClick={handleSetAmountTendered(
												Math.ceil(totalAmount / 100) * 100
											)}
											className="w-full focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 hover:text-white bg-gray-200  rounded text-gray-800 px-8 py-2 text-lg"
										>
											₱
											<strong className="ml-1">
												{numberWithCommas(Math.ceil(totalAmount / 100) * 100)}
											</strong>
										</button>
										<button
											type="button"
											onClick={handleSetAmountTendered(
												Math.ceil(totalAmount / 1000) * 1000
											)}
											className="w-full focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 hover:text-white bg-gray-200  rounded text-gray-800 px-8 py-2 text-lg"
										>
											₱
											<strong className="ml-1">
												{numberWithCommas(Math.ceil(totalAmount / 1000) * 1000)}
											</strong>
										</button>
									</div>
									<div className="flex items-center justify-center w-full">
										<button
											type="submit"
											disabled={change < 0 ? true : false}
											onClick={handleClick}
											className="w-full my-6 focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-lg"
										>
											Confirm Payment
										</button>
									</div>
									<div
										className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
										onClick={onModalToggle}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											aria-label="Close"
											className="icon icon-tabler icon-tabler-x"
											width={35}
											height={35}
											viewBox="0 0 24 24"
											strokeWidth="2.5"
											stroke="currentColor"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" />
											<line x1={18} y1={6} x2={6} y2={18} />
											<line x1={6} y1={6} x2={18} y2={18} />
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default connect(null, {})(PaymentCashModal);
