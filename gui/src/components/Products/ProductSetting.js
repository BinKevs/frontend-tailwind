import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getProductList,
	deleteProduct,
	getProduct,
	updateProduct,
	addProduct,
	addCategory,
	getCategoryList,
} from '../../store/actions/product/products';
import { getSupplierList } from '../../store/actions/supplier/suppliers';
import ProductModal from './ProductModal';
let products = [];

let EditButtonIsClicked = false;
let isImageChanged = false;
class ProductSetting extends React.Component {
	static propTypes = {
		products: PropTypes.array.isRequired,
		product: PropTypes.object.isRequired,
		categories: PropTypes.array.isRequired,
		getProductList: PropTypes.func.isRequired,
		getProduct: PropTypes.func.isRequired,
		deleteProduct: PropTypes.func.isRequired,
		addProduct: PropTypes.func.isRequired,
		updateProduct: PropTypes.func.isRequired,
	};
	state = {
		name: '',
		CategoryName: '',
		supplier: 0,
		description: '',
		price: 0,
		category: 0,
		stock: 0,
		image: null,
		productID: 0,
		search: '',
		urlFile: '',
		modal: false,
	};
	componentDidMount() {
		this.props.getProductList();
		this.props.getSupplierList();
		this.props.getCategoryList();
	}

	// when the image field changes it will save the image and also change the state of
	// isImageChanged to true for the update Form component to know that we didnt change the image
	// because we sent all data whenever we make a post or update so when the isImageChanged's status is false we will not include the field

	onChange = (e) => {
		if (e.target.name === 'image') {
			this.setState({
				[e.target.name]: e.target.files[0],
				urlFile: URL.createObjectURL(e.target.files[0]),
			});

			isImageChanged = true;
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	};
	// Submitting the name in the add category action
	onSubmitCategory = (event) => {
		event.preventDefault();
		let name = this.state.CategoryName;
		const category = { name };

		this.props.addCategory(category);
		this.setState({
			name: '',
		});
	};
	// when the isEditButtonClicked status is change this.props.product
	// *the product that will be edited* is being fetch because we trigger it in the bottom
	// then we will set it to the state and being passed on the formupdate component
	// componentDidUpdate(prevProps, prevState) {
	// 	if (isEditButtonClicked) {
	// 		EditButtonIsClicked = true;
	// 		const { id, name, description, price, supplier, category, stock, image } =
	// 			this.props.product;
	// 		this.setState({
	// 			name,
	// 			description,
	// 			price,
	// 			supplier,
	// 			category,
	// 			stock,
	// 			image,
	// 			productID: id,
	// 		});

	// 		isEditButtonClicked = false;
	// 	}
	// 	if (this.props.product !== prevProps.product) {
	// 		this.props.getProductList();
	// 	}
	// }
	//this will sent the updated product in the this.props.updateProduct to the action and will reset the state
	onUpdateSubmit = (productID) => {
		return (e) => {
			e.preventDefault();
			const { name, description, price, category, supplier, stock, image } =
				this.state;
			const formData = new FormData();

			formData.append('name', name);
			formData.append('description', description);
			formData.append('price', price);
			formData.append('category', category);
			formData.append('supplier', supplier);
			formData.append('stock', stock);
			if (isImageChanged) {
				formData.append('image', image);
			}

			this.props.updateProduct(productID, formData);
			this.setState({
				name: '',
				description: '',
				price: 0,
				supplier: 0,
				category: 0,
				new_stock: 0,
				stock: 0,
				image: null,
				productID: 0,
			});
			EditButtonIsClicked = false;
			isImageChanged = false;
			this.onModalToggleEdit();
		};
	};
	// when edit button is close this will reset the state and EditButtonIsClicked, isImageChanged and isEditButtonClicked states

	// sending the product that will be added to this.props.addProduct in the actions also reset the state
	onAddSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		const { name, description, price, category, supplier, stock, image } =
			this.state;
		const formData = new FormData();

		formData.append('name', name);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('category', category);
		formData.append('supplier', supplier);
		formData.append('stock', stock);
		formData.append('image', image);

		this.props.addProduct(formData);
		this.setState({
			name: '',
			description: '',
			price: 0,
			supplier: 0,
			category: 0,
			new_stock: 0,
			stock: 0,
			image: null,
		});
		isImageChanged = false;
		this.onModalToggleEdit();
	};

	// when edit button click this will fetch the supplier that will be edited and change the isEditButtonClicked status to true
	onEditCloseButton = (event) => {
		event.preventDefault();
		this.setState({
			name: '',
			description: '',
			price: 0,
			supplier: 0,
			category: 0,
			new_stock: 0,
			stock: 0,
			image: null,
			productID: 0,
		});
		EditButtonIsClicked = false;

		isImageChanged = false;
		this.ModalFunction();
	};
	//this will toggle the add modal form
	onModalToggleAdd = (e) => {
		e.preventDefault();
		this.ModalFunction();
	};
	//this will toggle the edit modal form
	onModalToggleEdit(productID) {
		return (event) => {
			event.preventDefault();
			this.props.getProduct(productID);
			this.ModalFunction();
			EditButtonIsClicked = true;
		};
	}
	// function that called to open or close modal
	ModalFunction() {
		this.setState({ modal: !this.state.modal });
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		document.getElementById('Body').classList.toggle('overflow-hidden');
	}
	render() {
		// destructure the products that came from the reducer so it will be easier to filter and show
		products = [];
		this.props.products.map((product) =>
			products.push({
				id: product.id,
				product_id: product.product_id,
				name: product.name,
				price: product.price,
				category: product.category_info.name,
				supplier: product.supplier_info.name,
				stock: product.stock,
				description: product.description,
			})
		);
		// This will filter the data from inventories array filtered at the top
		const lowercasedFilter = this.state.search.toLowerCase();
		const filteredData = products.filter((item) => {
			return Object.keys(item).some((key) =>
				item[key].toString().toLowerCase().includes(lowercasedFilter)
			);
		});
		return (
			<>
				<div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
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
							<h3 class="font-bold pl-2">Products</h3>
						</div>
					</div>
					<div className="py-5 w-full">
						<div className="mx-auto bg-white dark:bg-gray-800 shadow rounded">
							<div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-end items-start lg:items-stretch w-full">
								<div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
									<div className="lg:ml-6 flex items-start w-full">
										<div className="text-white cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center">
											<i class="fal fa-print fa-lg"></i>
										</div>
										<div
											onClick={this.onModalToggleAdd}
											className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-teal_custom transition duration-150 ease-in-out hover:bg-gray-600 w-12 h-12 rounded flex items-center justify-center"
										>
											<i class="fal fa-plus fa-lg"></i>
										</div>
									</div>
								</div>
								<div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
									<div className="flex items-center lg:border-l lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
										<p
											className="text-base text-gray-600 dark:text-gray-400"
											id="page-view"
										>
											Viewing 1 - 20 of 60
										</p>
										<div
											className="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded mr-4"
											onclick="pageView(false)"
										>
											<i class="fad fa-angle-left fa-2x"></i>
										</div>
										<div
											className="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer"
											onclick="pageView(true)"
										>
											<i class="fad fa-angle-right fa-2x"></i>
										</div>
									</div>
									<div className="lg:ml-6 flex items-center">
										<div class="relative w-full">
											<input
												type="text"
												name="search"
												placeholder=" "
												required
												class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
												onChange={this.onChange}
												value={this.state.search}
											/>
											<label
												for="search"
												class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
											>
												Search
											</label>
										</div>
										<i class="fad fa-search fa-lg"></i>
									</div>
								</div>
							</div>
							<div className="w-full overflow-x-auto">
								<table className="min-w-full bg-white dark:bg-gray-800">
									<thead>
										<tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
											<th className="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												<input
													type="checkbox"
													className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"
													onclick="checkAll(this)"
												/>
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Identification
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Name
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Price
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Category
											</th>
											{/* <th className="space-x-2 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												<span>Date</span>
												<i class="fal fa-arrow-up fa-lg"></i>
												<i class="fal fa-arrow-down"></i>
											</th> */}
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Supplier
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Stock
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Description
											</th>
											<td className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												More
											</td>
										</tr>
									</thead>
									<tbody>
										{filteredData.map((product) => (
											<tr
												key={product.id}
												className="h-24 border-gray-300 dark:border-gray-200 border-b"
											>
												<td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													<input
														type="checkbox"
														className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"
														onclick="tableInteract(this)"
													/>
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{product.product_id}
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{product.name}
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{product.price}
												</td>
												{/* <td className="pr-6 whitespace-no-wrap">
												<div className="flex items-center">
													<div className="h-8 w-8">
														<img
															src="https://tuk-cdn.s3.amazonaws.com/assets/components/advance_tables/at_1.png"
															alt
															className="h-full w-full rounded-full overflow-hidden shadow"
														/>
													</div>
													<p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
														Carrie Anthony
													</p>
												</div>
											</td> */}
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{product.category}
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{product.supplier}
												</td>
												<td className="pr-6 whitespace-no-wrap">
													<div className="flex items-center">
														<div
															className={
																product.stock >= 10
																	? 'w-2 h-2 rounded-full bg-green-400'
																	: 'w-2 h-2 rounded-full bg-red-400'
															}
														/>

														<p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
															{product.stock}
														</p>
													</div>
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{product.description}
												</td>
												<td className="pr-8 relative">
													<button className="button-see-more text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
														<div className="seeMore absolute left-0 top-0 mt-2 -ml-20 shadow-md z-10 w-32">
															<ul className="bg-white dark:bg-gray-800 shadow rounded p-2">
																<li
																	// onClick={this.onModalToggle}
																	onClick={this.onModalToggleEdit(product.id)}
																	className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-teal_custom hover:text-white px-3 font-normal"
																>
																	Edit
																</li>
																<li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-teal_custom hover:text-white px-3 font-normal">
																	Delete
																</li>
															</ul>
														</div>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="icon icon-tabler icon-tabler-dots-vertical dropbtn"
															width={28}
															height={28}
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															fill="none"
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<path stroke="none" d="M0 0h24v24H0z" />
															<circle cx={12} cy={12} r={1} />
															<circle cx={12} cy={19} r={1} />
															<circle cx={12} cy={5} r={1} />
														</svg>
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<ProductModal
					modal={this.state.modal}
					onModalToggleAdd={this.onModalToggleAdd}
					state={!EditButtonIsClicked ? this.state : this.props.product}
					onChange={this.onChange}
					suppliers={this.props.suppliers}
					categories={this.props.categories}
					onAddSubmit={this.onAddSubmit}
					onUpdateSubmit={this.onUpdateSubmit}
					EditButtonIsClicked={EditButtonIsClicked}
					isImageChanged={isImageChanged}
					onEditCloseButton={this.onEditCloseButton}
				/>
			</>
		);
	}
}
const mapStateToProps = (state) => ({
	products: state.products.products,
	product: state.products.product,
	suppliers: state.suppliers.suppliers,
	categories: state.products.categories,
});

export default connect(mapStateToProps, {
	getProductList,
	getProduct,
	getSupplierList,
	getCategoryList,
	deleteProduct,
	updateProduct,
	addCategory,
	addProduct,
})(ProductSetting);
