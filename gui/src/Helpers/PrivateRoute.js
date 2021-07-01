import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			if (auth.isLoading) {
				return (
					<div className="">
						<div class="loader-add-on flex w-full lg:w-4/5 justify-center justify-self-center text-gray-800">
							<i class="far fa-motorcycle fa-2x px-3"></i>
							<h1 class="font-Montserrat text-base">ABC Motor Parts</h1>
						</div>
						<div className="loader-div flex w-full lg:w-4/5 justify-center justify-self-center">
							<span class="loader">
								<span class="loader-inner"></span>
							</span>
						</div>
					</div>
				);
			} else if (!auth.isAuthenticated) {
				return <Redirect to="/login/" />;
			} else {
				return <Component {...props} />;
			}
		}}
	/>
);
const mapStateToProps = (state) => ({
	auth: state.AuthReducer,
});
export default connect(mapStateToProps)(PrivateRoute);
