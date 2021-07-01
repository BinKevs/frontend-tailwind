import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../store/actions/account/auth';
class Registration extends React.Component {
	state = {
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		password: '',
		password2: '',
	};
	static propTypes = {
		register: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	};
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
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { username, email, first_name, last_name, password, password2 } =
			this.state;
		return (
			<>
				<div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
					<div class="bg-gray-800 pt-3">
						<div class="rounded-tl-3xl bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white">
							<h3 class="font-bold pl-2">Transaction Items</h3>
						</div>
					</div>
					<div class="flex min-h-screen bg-white">
						<div class="max-w-lg mx-auto my-auto shadow-xl p-10">
							<div class="text-left p-0">
								{/* <div>
									<i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{' '}
									<h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
										ABC Motor Parts
									</h1>
								</div> */}

								<h1 class="text-gray-800 text-3xl font-medium">
									Create your Account here.
								</h1>
							</div>

							<form onSubmit={this.onSubmit} class="mt-9">
								<div class="mt-5 flex justify-between space-x-2">
									<div class="relative z-0 w-1/2 mb-5">
										<input
											type="text"
											name="first_name"
											onChange={this.onChange}
											value={first_name}
											placeholder=" "
											required
											class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:ring-0 focus:border-cyan-700 border-gray-200"
										/>
										<label
											for="name"
											class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
										>
											First name
										</label>
										<span class="text-sm text-red-600 hidden" id="error">
											First name is required
										</span>
									</div>
									<div class="relative z-0 w-1/2 mb-5">
										<input
											type="text"
											name="last_name"
											onChange={this.onChange}
											value={last_name}
											placeholder=" "
											required
											class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:ring-0 focus:border-cyan-700 border-gray-200"
										/>
										<label
											for="last_name"
											class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
										>
											Last name
										</label>
										<span class="text-sm text-red-600 hidden" id="error">
											Last name is required
										</span>
									</div>
								</div>
								<div class="relative z-0 w-full mb-5">
									<input
										type="text"
										name="email"
										onChange={this.onChange}
										value={email}
										placeholder=" "
										required
										class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:ring-0 focus:border-cyan-700 border-gray-200"
									/>
									<label
										for="name"
										class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
									>
										Email
									</label>
									<span class="text-sm text-red-600 hidden" id="error">
										Email is required
									</span>
								</div>
								<div class="relative z-0 w-full mb-5">
									<input
										type="text"
										name="username"
										onChange={this.onChange}
										value={username}
										placeholder=" "
										required
										class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 focus:ring-0 focus:border-cyan-700 border-gray-200"
									/>
									<label
										for="name"
										class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
									>
										Username
									</label>
									<span class="text-sm text-red-600 hidden" id="error">
										Username is required
									</span>
								</div>
								<div class="relative z-0 w-full mb-5">
									<input
										type="password"
										name="password"
										onChange={this.onChange}
										value={password}
										placeholder=" "
										required
										class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
									/>
									<label
										for="name"
										class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
									>
										Password
									</label>
									<span class="text-sm text-red-600 hidden" id="error">
										Password is required
									</span>
								</div>
								<div class="relative z-0 w-full mb-5">
									<input
										type="password"
										name="password2"
										onChange={this.onChange}
										value={password2}
										placeholder=" "
										required
										class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
									/>
									<label
										for="name"
										class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
									>
										Confirm Password
									</label>
									<span class="text-sm text-red-600 hidden" id="error">
										Confirm Password is required
									</span>
								</div>
								<div class="mt-10">
									<input
										type="submit"
										value="Create Account"
										class="py-3 bg-gray-800 text-white w-full rounded hover:bg-gray-600"
									/>
								</div>
							</form>
							{/* <div class="mt-6 block p-5 text-sm md:font-sans text-xs text-gray-800">
									<input type="checkbox" class="inline-block border-0" />
									<span class="inline-block">
										By creating an account you are agreeing to our{' '}
										<a class="" href="#" target="_blank" data-test="Link">
											{' '}
											<span class="underline">Terms and Conditions</span>{' '}
										</a>{' '}
										and
										<a class="" href="#" target="" data-test="Link">
											{' '}
											<span class="underline">Privacy Policy</span>{' '}
										</a>
									</span>
								</div> 

							*/}

							{/* <a class="" href="/login" data-test="Link">
								<span class="block p-5 text-center text-gray-800 text-xs">
									Already have an account?
								</span>
							</a> */}
						</div>
					</div>
				</div>
			</>
		);
	}
}
//get the isAuthenticated value from store-reducer-accounts-auth
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.AuthReducer.isAuthenticated,
	};
};
export default connect(mapStateToProps, { register })(Registration);
