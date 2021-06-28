import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getProductList } from '../../store/actions/product/products';
import { Link } from 'react-router-dom';
let products = [];

class ProductList extends React.Component {
	static propTypes = {
		products: PropTypes.array.isRequired,
		getProductList: PropTypes.func.isRequired,
		deleteProduct: PropTypes.func.isRequired,
		addToCart: PropTypes.func.isRequired,
	};
	state = {
		search: '',
	};
	numberWithCommas(x) {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}

	trimmedString(stringX) {
		if (stringX.length === 24) {
			return stringX;
		} else {
			return stringX.substring(0, 24) + '...';
		}
	}
	componentDidMount() {
		this.props.getProductList();
	}
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		products = [];
		this.props.products.map((product) =>
			products.push({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				category: product.category_info.name,
				supplier: product.supplier_info.name,
				stock: product.stock,
				description: product.description,
			})
		);
		const lowercasedFilter = this.state.search.toLowerCase();
		const filteredData = products.filter((item) => {
			return Object.keys(item).some((key) =>
				item[key].toString().toLowerCase().includes(lowercasedFilter)
			);
		});
		return (
			<>
				<div class="flex-1 bg-gray-100 pb-24 md:pb-5">
					<div class="flex flex-col lg:flex-row">
						<div class="w-full mt-4 p-8">
							<div className="flex flex-col xl:flex-row p-4 lg:p-8 justify-end items-start xl:items-stretch w-full">
								<div className="w-full xl:w-2/3 flex flex-col xl:flex-row items-start xl:items-center justify-end">
									<div className="flex items-center xl:border-l xl:border-r border-gray-300 dark:border-gray-200 py-3 xl:py-0 xl:px-6">
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

									<div className="xl:ml-6 flex items-center">
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
							<div class="mt-8 grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-5">
								{filteredData.map((product) => (
									<div
										class="rounded bg-white border-gray-200 shadow-md overflow-hidden relative hover:shadow-lg"
										key={product.id}
									>
										<img
											src={product.image}
											alt="stew"
											class="h-32 sm:h-48 w-full object-cover"
										/>
										<div class="m-4 bodi">
											<Link
												className="cursor-pointer"
												to={'/review/product/'.concat(product.id)}
											>
												<span class="font-bold">
													{this.trimmedString(product.name)}
												</span>
											</Link>
											<span class="block text-gray-500 text-sm">
												By {this.trimmedString(product.supplier)}
											</span>
										</div>

										<div class="absolute top-0 ml-2 p-2 mt-2 bg-teal_custom text-white text-sm uppercase font-bold rounded-full ">
											<i class="fad fa-tags fa-lg"></i>
											<span>₱{this.numberWithCommas(product.price)}</span>
										</div>
										<div class="product-tooltip absolute bottom-0 py-6 px-4 p-2 text-gray-800 text-sm uppercase font-bold">
											<span>{product.name}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapToStateToProps = (state) => ({
	products: state.products.products,
	// token: state.AuthReducer.token,
	isLoading: state.products.isLoading,
});
export default connect(mapToStateToProps, {
	getProductList,
})(ProductList);
