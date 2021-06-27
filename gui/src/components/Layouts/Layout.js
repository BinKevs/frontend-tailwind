import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/account/auth';
import React from 'react';
class Layout extends React.Component {
	state = {
		DashboardNavBtn: false,
		ProductsNavBtn: false,
		ReportsNavBtn: false,
		ProductSettingNavBtn: false,
		InventoryNavBtn: false,
		SupplierNavBtn: false,
		TransactionsNavBtn: false,
	};
	setActiveNav(NavBtn) {
		return (e) => {
			e.preventDefault();
			if (NavBtn === 'DashboardNavBtn') {
				this.setState({
					DashboardNavBtn: true,
					ProductsNavBtn: false,
					ReportsNavBtn: false,
					ProductSettingNavBtn: false,
					InventoryNavBtn: false,
					SupplierNavBtn: false,
					TransactionsNavBtn: false,
				});
			} else if (NavBtn === 'ProductsNavBtn') {
				this.setState({
					DashboardNavBtn: false,
					ProductsNavBtn: true,
					ReportsNavBtn: false,
					ProductSettingNavBtn: false,
					InventoryNavBtn: false,
					SupplierNavBtn: false,
					TransactionsNavBtn: false,
				});
			} else if (NavBtn === 'ReportsNavBtn') {
				this.setState({
					DashboardNavBtn: false,
					ProductsNavBtn: false,
					ReportsNavBtn: true,
					ProductSettingNavBtn: false,
					InventoryNavBtn: false,
					SupplierNavBtn: false,
					TransactionsNavBtn: false,
				});
			} else if (NavBtn === 'ProductSettingNavBtn') {
				this.setState({
					DashboardNavBtn: false,
					ProductsNavBtn: false,
					ReportsNavBtn: false,
					ProductSettingNavBtn: true,
					InventoryNavBtn: false,
					SupplierNavBtn: false,
					TransactionsNavBtn: false,
				});
			} else if (NavBtn === 'InventoryNavBtn') {
				this.setState({
					DashboardNavBtn: false,
					ProductsNavBtn: false,
					ReportsNavBtn: false,
					ProductSettingNavBtn: false,
					InventoryNavBtn: true,
					SupplierNavBtn: false,
					TransactionsNavBtn: false,
				});
			} else if (NavBtn === 'SupplierNavBtn') {
				this.setState({
					DashboardNavBtn: false,
					ProductsNavBtn: false,
					ReportsNavBtn: false,
					ProductSettingNavBtn: false,
					InventoryNavBtn: false,
					SupplierNavBtn: true,
					TransactionsNavBtn: false,
				});
			} else if (NavBtn === 'TransactionsNavBtn') {
				this.setState({
					DashboardNavBtn: false,
					ProductsNavBtn: false,
					ReportsNavBtn: false,
					ProductSettingNavBtn: false,
					InventoryNavBtn: false,
					SupplierNavBtn: false,
					TransactionsNavBtn: true,
				});
			}
		};
	}
	handleLogout = (e) => {
		e.preventDefault();
		this.props.history.push('/login');
		this.props.logout();
	};
	setDropDown(e) {
		e.preventDefault();
		document.getElementById('myDropdown').classList.toggle('invisible');
	}

	render() {
		const {
			DashboardNavBtn,
			ProductsNavBtn,
			ReportsNavBtn,
			ProductSettingNavBtn,
			InventoryNavBtn,
			SupplierNavBtn,
			TransactionsNavBtn,
		} = this.state;

		return (
			<>
				<nav
					class="bg-gray-800 pt-2 pb-1 px-1 mt-0 h-auto fixed w-full
			z-20 top-0"
				>
					<div class="flex flex-wrap justify-between items-center">
						<div class="flex pt-2 w-1/3 justify-start text-white">
							<i class="far fa-motorcycle fa-2x px-3"></i>
							<h1 class="font-Montserrat text-base">ABC Motor Parts</h1>
						</div>

						<div
							class="flex
						pt-2
						content-center
						w-1/3
						justify-end"
						>
							<div
								class="flex
							justify-around
							flex-none
							items-center"
							>
								<div class="relative inline-block md:mr-2 py-2">
									<button
										onClick={this.setDropDown}
										class=" text-white focus:outline-none"
									>
										{' '}
										<span class="pr-2">
											<i class="fad fa-user-friends"></i>
										</span>{' '}
										Hi, User{' '}
										<svg
											class="h-3 fill-current inline"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</button>
									<div
										id="myDropdown"
										class="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 w-36 invisible"
									>
										<div className="">
											<Link
												to="/accounts/settings/menu"
												class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block"
											>
												<i class="fa fa-cog fa-fw"></i> Settings
											</Link>
											{/* <div class="border border-gray-800"></div> */}
											{this.props.AuthReducer.isAuthenticated ? (
												<Link
													to="Login"
													class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block"
												>
													<i class="fas fa-sign-in-alt fa-fw"></i> Login
												</Link>
											) : (
												<div
													onClick={this.handleLogout}
													class="p-2 hover:bg-gray-800 text-white text-sm hover:no-underline inline-block cursor-pointer"
												>
													<i class="fas fa-sign-out-alt fa-fw"></i> Logout
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<div class="flex flex-col lg:flex-row bg-gray-800">
					<div class=" shadow-xl h-16 fixed bottom-0 lg:relative lg:h-screen z-10 w-full lg:w-48 bg-gray-800">
						<div class="lg:mt-20 lg:w-48 lg:fixed md:left-0 md:top-0 text-left">
							<ul
								id="NavDiv"
								class="flex flex-row lg:flex-col py-0 md:py-3 px-1 lg:px-2 text-center lg:text-left"
							>
								<li
									class="mr-3 flex-1 NavBtn"
									onClick={this.setActiveNav('DashboardNavBtn')}
								>
									<Link
										to="/dashboard"
										class={
											DashboardNavBtn
												? 'block py-1 md:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom'
												: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom'
										}
									>
										<i className="fas fa-chart-line pr-0 md:pr-3"></i>
										<span
											class={
												DashboardNavBtn
													? 'pb-1 md:pb-0 text-xs md:text-base text-white  block md:inline-block'
													: 'pb-1 md:pb-0 text-xs md:text-base text-gray-400 block md:inline-block'
											}
										>
											Dashboard
										</span>
									</Link>
								</li>
								<li
									class="mr-3 flex-1 NavBtn"
									onClick={this.setActiveNav('ProductsNavBtn')}
								>
									<Link
										to="/products"
										class={
											ProductsNavBtn
												? 'block py-1 md:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom'
												: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom'
										}
									>
										<i className="fas fa-cart-plus pr-0 md:pr-3"></i>
										<span
											class={
												ProductsNavBtn
													? 'pb-1 md:pb-0 text-xs md:text-base text-white  block md:inline-block'
													: 'pb-1 md:pb-0 text-xs md:text-base text-gray-400 block md:inline-block'
											}
										>
											Products
										</span>
									</Link>
								</li>
								<li
									class="mr-3 flex-1 NavBtn"
									onClick={this.setActiveNav('ReportsNavBtn')}
								>
									<Link
										to="/reports"
										class={
											ReportsNavBtn
												? 'block py-1 md:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom'
												: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom'
										}
									>
										<i class="fas fa-file-alt  pr-0 md:pr-3 "></i>
										<span
											class={
												ReportsNavBtn
													? 'pb-1 md:pb-0 text-xs md:text-base text-white  block md:inline-block'
													: 'pb-1 md:pb-0 text-xs md:text-base text-gray-400 block md:inline-block'
											}
										>
											Reports
										</span>
									</Link>
								</li>
								<li
									class="mr-3 flex-1 NavBtn"
									onClick={this.setActiveNav('ProductSettingNavBtn')}
								>
									<Link
										to="/products/settings"
										class={
											ProductSettingNavBtn
												? 'block py-1 md:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom'
												: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom'
										}
									>
										<i className="fas fa-sliders-h pr-0 md:pr-3"></i>

										<div
											class={
												ProductSettingNavBtn
													? 'pb-1 md:pb-0 text-xs md:text-base text-white block md:inline-block'
													: 'pb-1 md:pb-0 text-xs md:text-base text-gray-400 block md:inline-block'
											}
										>
											Product Setting
										</div>
									</Link>
								</li>
								<li
									class="mr-3 flex-1 NavBtn"
									onClick={this.setActiveNav('InventoryNavBtn')}
								>
									<Link
										to="/inventories"
										class={
											InventoryNavBtn
												? 'block py-1 md:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom'
												: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom'
										}
									>
										<i className="fas fa-clipboard-list pr-0 md:pr-3"></i>
										<span
											class={
												InventoryNavBtn
													? 'pb-1 md:pb-0 text-xs md:text-base text-white  block md:inline-block'
													: 'pb-1 md:pb-0 text-xs md:text-base text-gray-400 block md:inline-block'
											}
										>
											Inventory
										</span>
									</Link>
								</li>
								<li
									class="mr-3 flex-1 NavBtn"
									onClick={this.setActiveNav('SupplierNavBtn')}
								>
									<Link
										to="/supplier"
										class={
											SupplierNavBtn
												? 'block py-1 md:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom'
												: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom'
										}
									>
										<i className="fas fa-clipboard-list pr-0 md:pr-3"></i>
										<span
											class={
												SupplierNavBtn
													? 'pb-1 md:pb-0 text-xs md:text-base text-white  block md:inline-block'
													: 'pb-1 md:pb-0 text-xs md:text-base text-gray-400 block md:inline-block'
											}
										>
											Supplier
										</span>
									</Link>
								</li>
								<li
									class="mr-3 flex-1 NavBtn"
									onClick={this.setActiveNav('TransactionsNavBtn')}
								>
									<Link
										to="/transactions"
										class={
											TransactionsNavBtn
												? 'block py-1 md:py-3 pl-1 align-middle text-teal_custom no-underline border-b-2 border-teal_custom'
												: 'block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-teal_custom'
										}
									>
										<i className="fas fa-coins pr-0 md:pr-3"></i>
										<span
											class={
												TransactionsNavBtn
													? 'pb-1 md:pb-0 text-xs md:text-base text-white  block md:inline-block'
													: 'pb-1 md:pb-0 text-xs md:text-base text-gray-400 block md:inline-block'
											}
										>
											Transactions
										</span>
									</Link>
								</li>
								{/* <li class="mr-3 flex-1">
								<a
									href="#"
									class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500"
								>
									<i className="fas fa-sitemap pr-0 md:pr-3"></i>
									<span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
										Transaction Item's History
									</span>
								</a>
							</li> */}
							</ul>
						</div>
					</div>
					{this.props.children}
				</div>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		AuthReducer: state.AuthReducer,
	};
};
export default withRouter(connect(mapStateToProps, { logout })(Layout));
