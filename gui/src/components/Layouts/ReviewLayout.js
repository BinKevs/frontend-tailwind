import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
class ReviewLayout extends React.Component {
	render() {
		return (
			<>
				<nav class="bg-gray-800 pt-2 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
					<div class="flex flex-wrap justify-between items-center">
						<div class="flex pt-2 w-1/3 justify-start text-white">
							<i class="far fa-motorcycle fa-2x px-3"></i>
							<h1 class="font-Montserrat text-base">ABC Motor Parts</h1>
						</div>
						<div class="flex pt-2 w-1/3 justify-center text-white">
							<h1 class="font-Montserrat text-base">Products</h1>
						</div>
						<div class="flex pt-2 content-center w-1/3 justify-end">
							<div class="flex justify-around flex-none items-center">
								<div class="relative inline-block md:mr-2 py-2">
									<button class=" text-white focus:outline-none">
										<span class="pr-2">
											<i class="fad fa-star-half"></i>
										</span>
										Rate a product
									</button>
								</div>
							</div>
						</div>
					</div>
				</nav>
				{this.props.children}
			</>
		);
	}
}

export default withRouter(ReviewLayout);
