import React from 'react';
import { connect } from 'react-redux';
import { getAccountList } from '../../store/actions/account/auth';
import { register } from '../../store/actions/account/auth';
import RegistrationModal from './RegistrationModal';
let AccountsItems = [];
let EditButtonIsClicked = false;
class AccountsIndex extends React.Component {
	state = {
		search: '',
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		password: '',
		password2: '',
		modal: false,
	};
	setSeeMore(transaction_items_id) {
		return (e) => {
			e.preventDefault();
			document.getElementById(transaction_items_id).classList.toggle('hidden');
		};
	}
	componentDidMount() {
		this.props.getAccountList();
	}
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });
	// Submit the state value to the store actions-accounts-auth-register
	onSubmit = (e) => {
		e.preventDefault();
		const { username, email, first_name, last_name, password, password2 } =
			this.state;
		if (password !== password2) {
			console.log('Passwords do not match');
		} else {
			const newUser = {
				username,
				password,
				email,
				first_name,
				last_name,
			};
			this.props.register(newUser);
			console.log('Account created!');
		}
	};
	// when edit button click this will fetch the supplier that will be edited and change the isEditButtonClicked status to true
	onEditCloseButton = (event) => {
		event.preventDefault();
		this.setState({
			name: '',
			address: '',
			phone_number: '',
			supplierID: 0,
		});
		EditButtonIsClicked = false;
		this.ModalFunction();
	};
	//this will toggle the add modal form
	onModalToggleAdd = (e) => {
		e.preventDefault();
		this.ModalFunction();
	};
	//this will toggle the edit modal form
	onModalToggleEdit(supplierID) {
		return (event) => {
			event.preventDefault();
			this.props.getSupplier(supplierID);
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
		const { username, email, first_name, last_name, password, password2 } =
			this.state;
		//destructuring the dictionary for searching/ fetching purposes
		AccountsItems = [];
		this.props.accounts.map((accounts) =>
			AccountsItems.push({
				id: accounts.id,
				username: accounts.username,
				email: accounts.email,
				is_active: accounts.is_active,
				is_superuser: accounts.is_superuser,
				name: accounts.last_name + ' ' + accounts.first_name,
			})
		);
		//returning the filtered data from search
		const lowercasedFilter = this.state.search.toLowerCase();
		const filteredData = AccountsItems.filter((item) => {
			return Object.keys(item).some((key) =>
				item[key].toString().toLowerCase().includes(lowercasedFilter)
			);
		});
		return (
			<>
				<div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
					<div class="bg-gray-800 pt-3">
						<div
							class="rounded-tl-3xl bg-gradient-to-r
							from-teal_custom
							to-gray-800 p-4 shadow text-2xl text-white
"
						>
							<h3 class="font-bold pl-2">Accounts</h3>
						</div>
					</div>
					<div className="p-5 w-full">
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
											<i class="fa fa-user-plus fa-fw"></i>
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
											<th className="pl-14 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Identification
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Username
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Name
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Email
											</th>
											<th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
												Status
											</th>
											{/* <th className="space-x-2 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                        						<span>Date</span>
                        						<i class="fal fa-arrow-up fa-lg"></i>
                        						<i class="fal fa-arrow-down"></i>
                    						</th> */}
										</tr>
									</thead>
									<tbody>
										{filteredData.map((item) => (
											<tr
												key={item.id}
												className="h-24 border-gray-300 dark:border-gray-200 border-b"
											>
												<td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{item.id}
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{item.username}
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{item.name}
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{item.email}
												</td>
												<td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
													{item.is_active ? 'Active' : 'Inactive'}{' '}
													<strong>{item.is_superuser ? '(Admin)' : ''}</strong>
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

												<td className="pr-8 relative">
													<div
														id={item.id}
														className="mt-8 absolute left-0 -ml-12 shadow-md z-10 hidden w-32"
													>
														<ul className="bg-white dark:bg-gray-800 shadow rounded py-1">
															<li
																// onClick={this.onModalToggle}
																className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal"
															>
																Edit
															</li>
															<li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
																Delete
															</li>
														</ul>
													</div>
													<button className="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															onClick={this.setSeeMore(item.id)}
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
				<RegistrationModal
					modal={this.state.modal}
					onModalToggleAdd={this.onModalToggleAdd}
					state={!EditButtonIsClicked ? this.state : this.props.supplier}
					onChange={this.onChange}
					EditButtonIsClicked={EditButtonIsClicked}
					onEditCloseButton={this.onEditCloseButton}
					onSubmit={this.onSubmit}
				/>
			</>
		);
	}
}
const mapStateToProps = (state) => ({
	accounts: state.AuthReducer.accounts,
	isAuthenticated: state.AuthReducer.isAuthenticated,
});

export default connect(mapStateToProps, {
	getAccountList,
	register,
})(AccountsIndex);
