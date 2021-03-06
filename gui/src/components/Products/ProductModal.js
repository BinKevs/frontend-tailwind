import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const ProductModal = (props) => {
	const {
		suppliers,
		categories,
		onChange,
		onAddSubmit,
		isImageChanged,
		onUpdateSubmit,
		EditButtonIsClicked,
		onEditCloseButton,
		onModalToggleAdd,
		modal,
	} = props;
	const {
		name,
		description,
		price,
		category,
		supplier,
		stock,
		image,
		productID,
		urlFile,
	} = props.state;
	console.log(props.state);
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
								<form
									onSubmit={
										!EditButtonIsClicked
											? onAddSubmit
											: onUpdateSubmit(productID)
									}
								>
									<div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
										<div className="flex items-center justify-center w-full">
											<h1 className="text-center text-gray-800 dark:text-gray-100 text-2xl font-bold tracking-normal leading-tight mb-4">
												{!EditButtonIsClicked ? 'Add' : 'Update'} Product
											</h1>
										</div>
										<div className="">
											<div class="relative z-0 w-full mb-5">
												<input
													type="text"
													name="name"
													required
													value={name}
													onChange={onChange}
													placeholder=" "
													class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
												/>
												<label
													for="name"
													class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
												>
													Name
												</label>
												<span class="text-sm text-red-600 hidden" id="error">
													Name is required
												</span>
											</div>
											<div class="relative z-0 w-full mb-5">
												<textarea
													name="description"
													onChange={onChange}
													value={description}
													placeholder=" "
													required
													class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
												/>
												<label
													for="description"
													class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
												>
													Description
												</label>
												<span class="text-sm text-red-600 hidden" id="error">
													Description is required
												</span>
											</div>
											<div class="relative z-0 w-full mb-5 space-y-4">
												<label class="block">Image</label>
												<input
													class="pt-3 pb-2 block w-full px-2 mt-0 text-gray-700 border-2 rounded-l focus:ring-0 active:border-cyan-700 border-gray-200"
													type="file"
													name="image"
													onChange={onChange}
												/>

												{!EditButtonIsClicked ? (
													<></>
												) : (
													<img
														alt="product image"
														class={
															EditButtonIsClicked
																? 'object-cover'
																: 'object-cover h-52'
														}
														src={isImageChanged ? urlFile : image}
													/>
												)}
											</div>
											<div class="w-full mb-5">
												<button className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm">
													Add Category
												</button>
											</div>
											<div class="relative z-0 w-full mb-5">
												<label class="block my-2">Select Category</label>
												<div class="relative inline-block w-full text-gray-700">
													<select
														onChange={onChange}
														name="category"
														required
														class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
													>
														{category === 0 ? (
															<option selected>
																Open this to select category
															</option>
														) : (
															''
														)}
														{categories.map((category1) => (
															<option
																selected={
																	category1.id === category ? 'selected' : ''
																}
																value={category1.id}
																key={category1.id}
															>
																{category1.name}
															</option>
														))}
													</select>
												</div>
											</div>
											<div class="relative z-0 w-full mb-5">
												<label class="block my-2">Select Supplier</label>
												<div class="relative inline-block w-full text-gray-700">
													<select
														onChange={onChange}
														name="supplier"
														required
														class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:border-cyan-700"
														placeholder="Regular input"
													>
														{supplier === 0 ? (
															<option selected>
																Open this to select supplier
															</option>
														) : (
															''
														)}
														{suppliers.map((supplierItem) => (
															<option
																selected={
																	supplierItem.id === supplier ? 'selected' : ''
																}
																value={supplierItem.id}
																className="text-dark"
																key={supplierItem.id}
															>
																{supplierItem.name}
															</option>
														))}
													</select>
												</div>
											</div>
											<div class="relative z-0 w-full mb-5">
												<input
													type="number"
													name="price"
													onChange={onChange}
													value={price > 0 ? price : ''}
													required
													class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
												/>
												<label
													for="price"
													class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
												>
													Price
												</label>
												<span class="text-sm text-red-600 hidden" id="error">
													Price is required
												</span>
											</div>
											<div class="relative z-0 w-full mb-5">
												<input
													type="number"
													name="stock"
													onChange={onChange}
													value={stock > 0 ? stock : ''}
													required
													class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
												/>
												<label
													for="stock"
													class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
												>
													Stock
												</label>
												<span class="text-sm text-red-600 hidden" id="error">
													Stock is required
												</span>
											</div>
										</div>

										<div className="flex items-center justify-center w-full">
											<button
												type="submit"
												className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
											>
												{!EditButtonIsClicked ? 'Add' : 'Update'}
											</button>
											<button
												className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
												onClick={
													!EditButtonIsClicked
														? onModalToggleAdd
														: onEditCloseButton
												}
											>
												Cancel
											</button>
											{/* <div
													className="w-full flex justify-center py-12 items-center"
													id="button"
												>
													<button
														className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
														onClick={() => showModal(!modal)}
													>
														Open Modal
													</button>
												</div> */}
										</div>
										<div
											className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
											onClick={
												!EditButtonIsClicked
													? onModalToggleAdd
													: onEditCloseButton
											}
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
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
ProductModal.propTypes = {
	onAddSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	state: PropTypes.object.isRequired,
	suppliers: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
};
export default connect(null, {})(ProductModal);
