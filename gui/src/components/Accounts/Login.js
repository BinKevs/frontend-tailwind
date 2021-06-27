import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../store/actions/account/auth';
class Login extends React.Component {
	state = {
		username: '',
		password: '',
	};

	static propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	};
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	};
	// Submit the state value to the store actions-accounts-auth-Login
	onSubmit = (e) => {
		e.preventDefault();
		console.log('Submitted!!');
		this.props.login(this.state.username, this.state.password);
		if (this.props.isAuthenticated) {
			this.props.history.push('/products');
		}
	};
	render() {
		// if (this.props.isAuthenticated) {
		// 	return <Redirect to={'/Products'} />;
		// }
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

							<h1 class="text-gray-800 text-3xl font-medium mt-3">
								Login your Account here.
							</h1>
						</div>

						<form onSubmit={this.onSubmit} class="mt-9">
							<div class="relative z-0 w-full mb-5">
								<input
									type="text"
									name="username"
									placeholder=" "
									required
									class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
									onChange={this.onChange}
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
									placeholder=" "
									required
									class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
									onChange={this.onChange}
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
							<div class="mt-10">
								<button
									type="submit"
									class="py-3 bg-gray-800 text-white w-full rounded hover:bg-gray-600"
								>
									Login
								</button>
							</div>
						</form>

						<span class="block p-5 text-center text-xl text-gray-800 text-xs">
							Don't have an account?{' '}
							<Link className="text-blue-500" to="/register">
								Create here.
							</Link>
						</span>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.AuthReducer.isAuthenticated,
	};
};
export default connect(mapStateToProps, { login })(Login);
