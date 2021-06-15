import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductList } from '../../store/actions/product/products';
import { getTransactionList } from '../../store/actions/transaction/transactions';
import { getTransactionItemList } from '../../store/actions/transaction/transactions.js';
let transactionItemsFiltered = [];
var transactionItemsFilteredResult = [];
let transactionsFilteredDateSeparated = [];

let monthlySalesTransaction = 0;
let dailySalesTransaction = 0;
let weeklySalesTransaction = 0;
let totalSalesTransaction = 0;
let ReorderProduct = 0;
let ZeroProduct = 0;
let ProductCount = 0;

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
		transactionsFilteredDateSeparated = [];

		this.props.transactions.map((filteredTransactionObject) =>
			transactionsFilteredDateSeparated.push({
				id: filteredTransactionObject.id,
				totalAmount: filteredTransactionObject.totalAmount,
				month: filteredTransactionObject.created_at.split(' ')[0],
				day: filteredTransactionObject.created_at.split(' ')[1],
				year: filteredTransactionObject.created_at.split(' ')[2],
			})
		);
		monthlySalesTransaction = 0;
		dailySalesTransaction = 0;
		weeklySalesTransaction = 0;
		totalSalesTransaction = 0;
		ReorderProduct = 0;
		ZeroProduct = 0;
		ProductCount = 0;
		const DateNow = Date().toLocaleString().split(' ');

		let [start, end] = this.GetWeekDates();
		var StartDayOfTheWeek = new Date(start.toLocaleString().split(',')[0])
			.toString()
			.split(' ');
		var EndDayOfTheWeek = new Date(end.toLocaleString().split(',')[0])
			.toString()
			.split(' ');
		console.log(StartDayOfTheWeek);
		for (var i = 0; i < transactionsFilteredDateSeparated.length; i++) {
			var month = transactionsFilteredDateSeparated[i].month;
			var day = transactionsFilteredDateSeparated[i].day;
			var year = transactionsFilteredDateSeparated[i].year;
			//Fetch total sales

			totalSalesTransaction += parseInt(
				transactionsFilteredDateSeparated[i].totalAmount
			);
			//Fetch montly sales
			if (year == DateNow[3]) {
				if (month == DateNow[1]) {
					monthlySalesTransaction += parseInt(
						transactionsFilteredDateSeparated[i].totalAmount
					);
					//Fetch daily sales
					if (day == DateNow[2]) {
						dailySalesTransaction += parseInt(
							transactionsFilteredDateSeparated[i].totalAmount
						);
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
					if (StartDayOfTheWeek[1] != EndDayOfTheWeek[1]) {
						if (
							(month == StartDayOfTheWeek[1] && day >= StartDayOfTheWeek[2]) ||
							(month == EndDayOfTheWeek[1] && day <= EndDayOfTheWeek[2])
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
		transactionItemsFilteredResult = [];

		this.props.transaction_items.map((filteredTransactionItemObject) =>
			transactionItemsFiltered.push({
				id: filteredTransactionItemObject.id,
				productName: filteredTransactionItemObject.product_info.name,
				quantity: filteredTransactionItemObject.quantity,
			})
		);

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
								bg-gradient-to-b
								from-green-200
								to-green-100
								border-b-4 border-green-600
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
								bg-gradient-to-b
								from-green-200
								to-green-100
								border-b-4 border-green-600
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
								bg-gradient-to-b
								from-red-200
								to-red-100
								border-b-4 border-red-600
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
								bg-gradient-to-b
								from-red-200
								to-red-100
								border-b-4 border-red-600
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
								bg-gradient-to-b
								from-red-200
								to-red-100
								border-b-4 border-red-600
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
								bg-gradient-to-b
								from-green-200
								to-green-100
								border-b-4 border-green-600
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
					</div>
					{/* <div class="flex flex-row flex-wrap flex-grow mt-2">
					<div class="w-full md:w-1/2 xl:w-1/3 p-6">
					
						<div class="bg-white border-transparent rounded-lg shadow-xl">
							<div
								class="
									bg-gradient-to-b
									from-gray-300
									to-gray-100
									uppercase
									text-gray-800
									border-b-2 border-gray-300
									rounded-tl-lg rounded-tr-lg
									p-2
								"
							>
								<h5 class="font-bold uppercase text-gray-600">Graph</h5>
							</div>
							<div class="p-5">
								<canvas
									id="chartjs-7"
									class="chartjs"
									width="undefined"
									height="undefined"
								></canvas>
								<script>
									new Chart(document.getElementById('chartjs-7'), {
										type: 'bar',
										data: {
											labels: ['January', 'February', 'March', 'April'],
											datasets: [
												{
													label: 'Page Impressions',
													data: [10, 20, 30, 40],
													borderColor: 'rgb(255, 99, 132)',
													backgroundColor: 'rgba(255, 99, 132, 0.2)',
												},
												{
													label: 'Adsense Clicks',
													data: [5, 15, 10, 30],
													type: 'line',
													fill: false,
													borderColor: 'rgb(54, 162, 235)',
												},
											],
										},
										options: {
											scales: {
												yAxes: [
													{
														ticks: {
															beginAtZero: true,
														},
													},
												],
											},
										},
									});
								</script>
							</div>
						</div>
					
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-6">
					
						<div class="bg-white border-transparent rounded-lg shadow-xl">
							<div
								class="
									bg-gradient-to-b
									from-gray-300
									to-gray-100
									uppercase
									text-gray-800
									border-b-2 border-gray-300
									rounded-tl-lg rounded-tr-lg
									p-2
								"
							>
								<h5 class="font-bold uppercase text-gray-600">Graph</h5>
							</div>
							<div class="p-5">
								<canvas
									id="chartjs-0"
									class="chartjs"
									width="undefined"
									height="undefined"
								></canvas>
								<script>
									new Chart(document.getElementById('chartjs-0'), {
										type: 'line',
										data: {
											labels: [
												'January',
												'February',
												'March',
												'April',
												'May',
												'June',
												'July',
											],
											datasets: [
												{
													label: 'Views',
													data: [65, 59, 80, 81, 56, 55, 40],
													fill: false,
													borderColor: 'rgb(75, 192, 192)',
													lineTension: 0.1,
												},
											],
										},
										options: {},
									});
								</script>
							</div>
						</div>
			
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-6">
						
						<div class="bg-white border-transparent rounded-lg shadow-xl">
							<div
								class="
									bg-gradient-to-b
									from-gray-300
									to-gray-100
									uppercase
									text-gray-800
									border-b-2 border-gray-300
									rounded-tl-lg rounded-tr-lg
									p-2
								"
							>
								<h5 class="font-bold uppercase text-gray-600">Graph</h5>
							</div>
							<div class="p-5">
								<canvas
									id="chartjs-1"
									class="chartjs"
									width="undefined"
									height="undefined"
								></canvas>
								<script>
									new Chart(document.getElementById('chartjs-1'), {
										type: 'bar',
										data: {
											labels: [
												'January',
												'February',
												'March',
												'April',
												'May',
												'June',
												'July',
											],
											datasets: [
												{
													label: 'Likes',
													data: [65, 59, 80, 81, 56, 55, 40],
													fill: false,
													backgroundColor: [
														'rgba(255, 99, 132, 0.2)',
														'rgba(255, 159, 64, 0.2)',
														'rgba(255, 205, 86, 0.2)',
														'rgba(75, 192, 192, 0.2)',
														'rgba(54, 162, 235, 0.2)',
														'rgba(153, 102, 255, 0.2)',
														'rgba(201, 203, 207, 0.2)',
													],
													borderColor: [
														'rgb(255, 99, 132)',
														'rgb(255, 159, 64)',
														'rgb(255, 205, 86)',
														'rgb(75, 192, 192)',
														'rgb(54, 162, 235)',
														'rgb(153, 102, 255)',
														'rgb(201, 203, 207)',
													],
													borderWidth: 1,
												},
											],
										},
										options: {
											scales: {
												yAxes: [
													{
														ticks: {
															beginAtZero: true,
														},
													},
												],
											},
										},
									});
								</script>
							</div>
						</div>
				
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-6">
					
						<div class="bg-white border-transparent rounded-lg shadow-xl">
							<div
								class="
									bg-gradient-to-b
									from-gray-300
									to-gray-100
									uppercase
									text-gray-800
									border-b-2 border-gray-300
									rounded-tl-lg rounded-tr-lg
									p-2
								"
							>
								<h5 class="font-bold uppercase text-gray-600">Graph</h5>
							</div>
							<div class="p-5">
								<canvas
									id="chartjs-4"
									class="chartjs"
									width="undefined"
									height="undefined"
								></canvas>
								<script>
									new Chart(document.getElementById('chartjs-4'), {
										type: 'doughnut',
										data: {
											labels: ['P1', 'P2', 'P3'],
											datasets: [
												{
													label: 'Issues',
													data: [300, 50, 100],
													backgroundColor: [
														'rgb(255, 99, 132)',
														'rgb(54, 162, 235)',
														'rgb(255, 205, 86)',
													],
												},
											],
										},
									});
								</script>
							</div>
						</div>
			
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-6">
						
						<div class="bg-white border-transparent rounded-lg shadow-xl">
							<div
								class="
									bg-gradient-to-b
									from-gray-300
									to-gray-100
									uppercase
									text-gray-800
									border-b-2 border-gray-300
									rounded-tl-lg rounded-tr-lg
									p-2
								"
							>
								<h5 class="font-bold uppercase text-gray-600">Graph</h5>
							</div>
							<div class="p-5">
								<table class="w-full p-5 text-gray-700">
									<thead>
										<tr>
											<th class="text-left text-blue-900">Name</th>
											<th class="text-left text-blue-900">Side</th>
											<th class="text-left text-blue-900">Role</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>Obi Wan Kenobi</td>
											<td>Light</td>
											<td>Jedi</td>
										</tr>
										<tr>
											<td>Greedo</td>
											<td>South</td>
											<td>Scumbag</td>
										</tr>
										<tr>
											<td>Darth Vader</td>
											<td>Dark</td>
											<td>Sith</td>
										</tr>
									</tbody>
								</table>

								<p class="py-2"><a href="#">See More issues...</a></p>
							</div>
						</div>
				
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-6">
					
						<div class="bg-white border-transparent rounded-lg shadow-xl">
							<div
								class="
									bg-gradient-to-b
									from-gray-300
									to-gray-100
									uppercase
									text-gray-800
									border-b-2 border-gray-300
									rounded-tl-lg rounded-tr-lg
									p-2
								"
							>
								<h5 class="font-bold uppercase text-gray-600">Advert</h5>
							</div>
							<div class="p-5 text-center">
								<script
									async
									type="text/javascript"
									src="//cdn.carbonads.com/carbon.js?serve=CK7D52JJ&placement=wwwtailwindtoolboxcom"
									id="_carbonads_js"
								></script>
							</div>
						</div>
						
					</div>
				</div> */}
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
