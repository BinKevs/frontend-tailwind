import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductList } from '../../store/actions/product/products';
import { getTransactionList } from '../../store/actions/transaction/transactions';
import { getTransactionItemList } from '../../store/actions/transaction/transactions.js';
let transactionItemsFiltered = [];
let transactionItemsFilteredResult = [];
let transactionsFilteredDateSeparated = [];
let transactionsDailyFiltered = [];
let monthlySalesTransaction = 0;
let dailySalesTransaction = 0;
let weeklySalesTransaction = 0;
let totalSalesTransaction = 0;
let ReorderProduct = 0;
let ZeroProduct = 0;
let ProductCount = 0;
let DateNow = Date().toLocaleString().split(' ');
class DashboardIndex extends React.Component {
	static propTypes = {
		products: PropTypes.array.isRequired,
		transactions: PropTypes.array.isRequired,
		transaction_items: PropTypes.array.isRequired,
		getProductList: PropTypes.func.isRequired,
		getTransactionList: PropTypes.func.isRequired,
		getTransactionItemList: PropTypes.func.isRequired,
	};
	numberWithCommas(x) {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}
	GetWeekDates() {
		let now = new Date();
		let dayOfWeek = now.getDay(); //0-6
		let numDay = now.getDate();

		let start = new Date(now); //copy
		start.setDate(numDay - dayOfWeek);
		start.setHours(0, 0, 0, 0);

		let end = new Date(now); //copy
		end.setDate(numDay + (7 - dayOfWeek));
		end.setHours(0, 0, 0, 0);

		return [start, end];
	}
	// getting the props from product reducer, transaction list reducer, transaction item list reducer

	componentDidMount() {
		this.props.getProductList();
		this.props.getTransactionList();
		this.props.getTransactionItemList();
	}

	render() {
		// console.log(Date(start.toLocaleString()), end.toLocaleString());
		monthlySalesTransaction = 0;
		dailySalesTransaction = 0;
		weeklySalesTransaction = 0;
		totalSalesTransaction = 0;
		ReorderProduct = 0;
		ZeroProduct = 0;
		ProductCount = 0;
		transactionsFilteredDateSeparated = [];
		transactionsDailyFiltered = [];
		this.props.transactions.map((filteredTransactionObject) =>
			transactionsFilteredDateSeparated.push({
				id: filteredTransactionObject.id,
				totalAmount: filteredTransactionObject.totalAmount,
				month: filteredTransactionObject.created_at.split(' ')[0],
				day: filteredTransactionObject.created_at.split(' ')[1],
				year: filteredTransactionObject.created_at.split(' ')[2],
				time: filteredTransactionObject.created_at.split(' ')[3],
			})
		);

		let [start, end] = this.GetWeekDates();
		var StartDayOfTheWeek = new Date(start.toLocaleString().split(',')[0])
			.toString()
			.split(' ');
		var EndDayOfTheWeek = new Date(end.toLocaleString().split(',')[0])
			.toString()
			.split(' ');

		for (var i = 0; i < transactionsFilteredDateSeparated.length; i++) {
			var month = transactionsFilteredDateSeparated[i].month;
			var day = transactionsFilteredDateSeparated[i].day;
			var year = transactionsFilteredDateSeparated[i].year;
			//Fetch total sales

			totalSalesTransaction += parseInt(
				transactionsFilteredDateSeparated[i].totalAmount
			);
			//Fetch montly sales
			if (year === DateNow[3]) {
				if (month === DateNow[1]) {
					monthlySalesTransaction += parseInt(
						transactionsFilteredDateSeparated[i].totalAmount
					);
					//Fetch daily sales
					if (day === DateNow[2]) {
						dailySalesTransaction += parseInt(
							transactionsFilteredDateSeparated[i].totalAmount
						);
						transactionsDailyFiltered.push({
							totalAmount: transactionsFilteredDateSeparated[i].totalAmount,
							date: transactionsFilteredDateSeparated[i].time,
						});
					}
				}
			}
			//Fetch Weekly
			if (
				year.includes(StartDayOfTheWeek[3]) &&
				year.includes(EndDayOfTheWeek[3])
			) {
				if (
					month.includes(StartDayOfTheWeek[1]) &&
					month.includes(EndDayOfTheWeek[1])
				) {
					if (StartDayOfTheWeek[1] !== EndDayOfTheWeek[1]) {
						if (
							(month === StartDayOfTheWeek[1] && day >= StartDayOfTheWeek[2]) ||
							(month === EndDayOfTheWeek[1] && day <= EndDayOfTheWeek[2])
						) {
							weeklySalesTransaction += parseInt(
								transactionsFilteredDateSeparated[i].totalAmount
							);
						}
					} else {
						if (day >= StartDayOfTheWeek[2] && day <= EndDayOfTheWeek[2]) {
							weeklySalesTransaction += parseInt(
								transactionsFilteredDateSeparated[i].totalAmount
							);
						}
					}
				}
			}
		}

		//Fetch reorder product
		this.props.products
			.filter((prod) => parseInt(prod.stock) < 10)
			.map((product) => (ReorderProduct += 1));
		//Fetch zero product
		this.props.products
			.filter((prod) => parseInt(prod.stock) < 1)
			.map((product) => (ZeroProduct += 1));
		//Fetch all product
		this.props.products.map((product) => (ProductCount += 1));
		//Fetch Combine product quantity sales
		transactionItemsFiltered = [];

		this.props.transaction_items.map((filteredTransactionItemObject) =>
			transactionItemsFiltered.push({
				id: filteredTransactionItemObject.id,
				productName: filteredTransactionItemObject.product_info.name,
				quantity: filteredTransactionItemObject.quantity,
			})
		);
		transactionItemsFilteredResult = [];
		transactionItemsFiltered.forEach(function (obj) {
			var productNameX = obj.productName;
			if (!this[productNameX])
				transactionItemsFilteredResult.push((this[productNameX] = obj));
			else this[productNameX].quantity += obj.quantity;
		}, Object.create(null));

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
							<h3 class="font-bold pl-2">Dashboard</h3>
						</div>
					</div>
					<div class="flex flex-wrap">
						<div class="w-full md:w-1/2 xl:w-1/3 p-6">
							<div
								class="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
							>
								<div class="flex flex-row items-center">
									<div class="flex-shrink pr-4">
										<div class="rounded-full p-5 bg-green-600">
											<i class="fa fa-wallet fa-2x fa-inverse"></i>
										</div>
									</div>
									<div class="flex-1 text-right md:text-center">
										<h5 class="font-bold uppercase text-gray-600">
											Total Revenue
										</h5>
										<h3 class="font-bold text-3xl">
											₱{this.numberWithCommas(totalSalesTransaction)}
											<span class="text-green-500">
												<i class="fas fa-caret-up"></i>
											</span>
										</h3>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/2 xl:w-1/3 p-6">
							<div
								class="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
							>
								<div class="flex flex-row items-center">
									<div class="flex-shrink pr-4">
										<div class="rounded-full p-5 bg-green-600">
											<i class="fad fa-calendar-alt fa-2x fa-inverse"></i>
										</div>
									</div>
									<div class="flex-1 text-right md:text-center">
										<h5 class="font-bold uppercase text-gray-600">
											Monthly Sales (June)
										</h5>
										<h3 class="font-bold text-3xl">
											₱{this.numberWithCommas(monthlySalesTransaction)}
											<span class="text-green-500">
												<i class="fas fa-caret-up"></i>
											</span>
										</h3>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/2 xl:w-1/3 p-6">
							<div
								class="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
							>
								<div class="flex flex-row items-center">
									<div class="flex-shrink pr-4">
										<div class="rounded-full p-5 bg-red-600">
											<i class="fad fa-calendar-day fa-2x fa-inverse"></i>
										</div>
									</div>
									<div class="flex-1 text-right md:text-center">
										<h5 class="font-bold uppercase text-gray-600">
											Daily Sales
										</h5>
										<h3 class="font-bold text-3xl">
											₱{this.numberWithCommas(dailySalesTransaction)}
											<span class="text-red-500">
												<i class="fas fa-caret-down"></i>
											</span>
										</h3>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/2 xl:w-1/3 p-6">
							<div
								class="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
							>
								<div class="flex flex-row items-center">
									<div class="flex-shrink pr-4">
										<div class="rounded-full p-5 bg-red-600">
											<i class="fad fa-calendar-week fa-2x fa-inverse"></i>
										</div>
									</div>
									<div class="flex-1 text-right md:text-center">
										<h5 class="font-bold uppercase text-gray-600">
											Weekly Sales
										</h5>
										<h3 class="font-bold text-3xl">
											₱{this.numberWithCommas(weeklySalesTransaction)}
											<span class="text-red-500">
												<i class="fas fa-caret-down"></i>
											</span>
										</h3>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/2 xl:w-1/3 p-6">
							<div
								class="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
							>
								<div class="flex flex-row items-center">
									<div class="flex-shrink pr-4">
										<div class="rounded-full p-5 bg-red-600">
											<i className="fad fa-layer-plus fa-2x fa-inverse"></i>
										</div>
									</div>
									<div class="flex-1 text-right md:text-center">
										<h5 class="font-bold uppercase text-gray-600">
											Number of Products to be Reorder
										</h5>
										<h3 class="font-bold text-3xl">
											{this.numberWithCommas(ReorderProduct)}
										</h3>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/2 xl:w-1/3 p-6">
							<div
								class="
								bg-white
								border-b-4 border-teal_custom
								rounded-lg
								shadow-xl
								p-5
							"
							>
								<div class="flex flex-row items-center">
									<div class="flex-shrink pr-4">
										<div class="rounded-full p-5 bg-green-600">
											<i className="fad fa-dolly-flatbed-empty fa-2x fa-inverse"></i>
										</div>
									</div>
									<div class="flex-1 text-right md:text-center">
										<h5 class="font-bold uppercase text-gray-600">
											Number of Zero Stock Products
										</h5>
										<h3 class="font-bold text-3xl">
											{this.numberWithCommas(ZeroProduct)}
										</h3>
									</div>
								</div>
							</div>
						</div>

						{/* <div className="w-1/2 mx-auto p-6 bg-white shadow-lg">
							<div className="relative w-full max-w-full flex-grow">
								<h6 className="uppercase text-gray-800 mb-1 text-xs font-semibold">
									Sales
								</h6>
								<h2 className="text-gray-800 text-xl font-semibold">Daily</h2>
							</div>
							<div className="chart">
								<Line
									data={{
										labels: transactionsDailyFiltered.map((x) => x.date),
										datasets: [
											{
												label:
													DateNow[0] +
													' ' +
													DateNow[1] +
													' ' +
													DateNow[2] +
													' ' +
													DateNow[3] +
													' Sales',
												fill: false,
												data: transactionsDailyFiltered.map(
													(x) => x.totalAmount
												),
												backgroundColor: '#5bc0de',
											},
										],
									}}
									options={{
										plugins: {
											legend: {
												labels: {
													// This more specific font property overrides the global property
													font: {
														size: 15,
													},
												},
												position: 'bottom',
												align: 'end',
											},
										},
										scales: {
											xAxes: [{}],
											yAxes: [
												{
													ticks: {
														min: 0,
													},
												},
											],
										},
									}}
								/>
							</div>
						</div> */}
						<div className="w-6/12 overflow-x-auto p-5">
							<div className="bg-white border-b-4 border-red-600 rounded-lg shadow-xl p-5">
								<h2 className="text-red-600 text-2xl">
									We're running out of stock in the following items
								</h2>
								<table className="min-w-full ">
									<thead>
										<tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Product Name
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Stock
											</th>
										</tr>
									</thead>
									<tbody>
										{this.props.products
											.filter((prod) => prod.stock < 10)
											.map((product) => (
												<tr
													key={product.id}
													className="h-24 border-gray-300 dark:border-gray-200 border-b"
												>
													<td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
														{product.name}
													</td>
													<td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
														{product.stock}
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="w-6/12 overflow-x-auto p-5">
							<div className="bg-white border-b-4 border-teal_custom rounded-lg shadow-xl p-5">
								<h2 className="text-gray-700 text-2xl">Top Selling Products</h2>
								<table className="min-w-full ">
									<thead>
										<tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Product name
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Number of sold items
											</th>
										</tr>
									</thead>
									<tbody>
										{transactionItemsFilteredResult
											.sort((a, b) => (a.quantity < b.quantity ? 1 : -1))
											.slice(0, 4)
											.map((item) => (
												<tr
													key={item.id}
													className="h-24 border-gray-300 dark:border-gray-200 border-b"
												>
													<td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
														{item.productName}
													</td>
													<td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal">
														{item.quantity}
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.products.products,
	transactions: state.transactions.transactions,
	transaction_items: state.transactions.transaction_item_list,
});

export default connect(mapStateToProps, {
	getProductList,
	getTransactionList,
	getTransactionItemList,
})(DashboardIndex);
