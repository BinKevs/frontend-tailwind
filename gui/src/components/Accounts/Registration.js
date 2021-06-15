import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../store/actions/account/auth';
class Registration extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		password2: '',
	};
	static propTypes = {
		register: PropTypes.func.isRequired,
		createMessage: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	};
	// Submit the state value to the store actions-accounts-auth-register
	onSubmit = (e) => {
		e.preventDefault();
		const { username, email, password, password2 } = this.state;
		if (password !== password2) {
			this.props.createMessage({ messageError: 'Passwords do not match' });
		} else {
			const newUser = {
				username,
				password,
				email,
			};
			this.props.register(newUser);
		}
	};
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to="/dashboard" />;
		}
		const { username, email, password, password2 } = this.state;
		return (
			<>
				<div class="flex min-h-screen bg-white">
					<div
						class="w-1/2 bg-cover md:block hidden"
						style={{
							backgroundImage:
								'url(https://wallpaperaccess.com/full/56139.jpg)',
						}}
					></div>
					<div class="md:w-1/2 max-w-lg mx-auto my-auto px-4 py-5 shadow-none">
						<div class="text-left p-0">
							<div>
								<i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{' '}
								<h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
									ABC Motor Parts
								</h1>
							</div>

							<h1 class="text-gray-800 text-3xl font-medium">
								Create your Account here.
							</h1>
						</div>

						<form action="#" class="mt-9">
							<div class="mt-5 flex justify-between space-x-2">
								<div class="relative z-0 w-1/2 mb-5">
									<input
										type="text"
										name="first_name"
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
										name="Last name"
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
									name="name"
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
									name="name"
									placeholder=" "
									required
									class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
								/>
								<label
									for="name"
									class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
								>
									Enter Password
								</label>
								<span class="text-sm text-red-600 hidden" id="error">
									Password is required
								</span>
							</div>

							<div class="mt-6 block p-5 text-sm md:font-sans text-xs text-gray-800">
								<input type="checkbox" class="inline-block border-0" />
								<span class="inline-block">
									By creating an account you are agreeing to our{' '}
									<a class="" href="/s/terms" target="_blank" data-test="Link">
										{' '}
										<span class="underline">Terms and Conditions</span>{' '}
									</a>{' '}
									and
									<a
										class=""
										href="/s/privacy"
										target="_blank"
										data-test="Link"
									>
										{' '}
										<span class="underline">Privacy Policy</span>{' '}
									</a>
								</span>
							</div>

							<div class="mt-10">
								<Link to="">
									<input
										type="submit"
										value="Create Account"
										class="py-3 bg-gray-800 text-white w-full rounded hover:bg-gray-600"
									/>
								</Link>
							</div>
						</form>
						<a class="" href="/login" data-test="Link">
							<span class="block p-5 text-center text-gray-800 text-xs">
								Already have an account?
							</span>
						</a>
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
