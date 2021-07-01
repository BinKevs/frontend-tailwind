import React from 'react';
import { connect } from 'react-redux';
const RegistrationModal = (props) => {
	const { username, email, first_name, last_name, password, password2 } =
		props.state;
	const {
		onChange,
		onSubmit,
		EditButtonIsClicked,
		onEditCloseButton,
		onModalToggleAdd,
		modal,
	} = props;
	return (
		<>
			<div class={modal ? 'h-screen ' : 'h-screen hidden'}>
				<div class="mx-auto max-w-screen-lg h-full">
					<div
						className="z-20 absolute top-0 right-0 bottom-0 left-0"
						id="modal"
					>
						<div class="modal-overlay absolute w-full h-full z-25 bg-gray-800 opacity-50"></div>
						<div className="h-full overflow-auto w-full flex flex-col">
							<div className="m-2 md:m-12">
								{/* <div class="text-left p-0">
									<div>
									<i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{' '}
									<h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
										ABC Motor Parts
									</h1>
								</div>

									<h1 class="text-gray-800 text-3xl font-medium">
										Create your Account here.
									</h1>
								</div> */}
								<form onSubmit={onSubmit} class="mt-9">
									<div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
										<div class="text-left p-0 mb-8">
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
										<div class="mt-5 flex justify-between space-x-2">
											<div class="relative z-0 w-1/2 mb-5">
												<input
													type="text"
													name="first_name"
													onChange={onChange}
													value={first_name}
													placeholder=" "
													required
													class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
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
													onChange={onChange}
													value={last_name}
													placeholder=" "
													required
													class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
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
												onChange={onChange}
												value={email}
												placeholder=" "
												required
												class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
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
												onChange={onChange}
												value={username}
												placeholder=" "
												required
												class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700 border-gray-200"
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
												onChange={onChange}
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
												onChange={onChange}
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

										<div className="flex items-center justify-center w-full mt-10">
											<button
												type="submit"
												className="focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-700 bg-cyan-700 rounded text-white px-8 py-2 text-sm"
											>
												{!EditButtonIsClicked ? 'Add' : 'Update'}
											</button>
											<button
												className="focus:outline-none ml-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 transition duration-150 text-gray-600 dark:text-gray-400 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
												onClick={
													!EditButtonIsClicked
														? onModalToggleAdd
														: onEditCloseButton
												}
											>
												Cancel
											</button>
											{/* <div
													className="w-full flex justify-center py-12 items-center"
													id="button"
												>
													<button
														className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
														onClick={() => showModal(!modal)}
													>
														Open Modal
													</button>
												</div> */}
										</div>

										<div
											className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
											onClick={
												!EditButtonIsClicked
													? onModalToggleAdd
													: onEditCloseButton
											}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												aria-label="Close"
												className="icon icon-tabler icon-tabler-x"
												width={35}
												height={35}
												viewBox="0 0 24 24"
												strokeWidth="2.5"
												stroke="currentColor"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<line x1={18} y1={6} x2={6} y2={18} />
												<line x1={6} y1={6} x2={18} y2={18} />
											</svg>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default connect(null, {})(RegistrationModal);

{
	/* <div class="bg-gray-100 flex-1 mt-20 md:mt-14 pb-24 md:pb-5">
					<div class="bg-gray-800 pt-3">
						<div class="rounded-tl-3xl bg-gradient-to-r from-teal_custom to-gray-800 p-4 shadow text-2xl text-white">
							<h3 class="font-bold pl-2">Transaction Items</h3>
						</div>
					</div>
					<div class="flex min-h-screen bg-white">
						<div class="max-w-lg mx-auto my-auto shadow-xl p-10">
							<div class="text-left p-0">
								

								<h1 class="text-gray-800 text-3xl font-medium">
									Create your Account here.
								</h1>
							</div>

							
						
						</div>
					</div>
				</div> */
}
{
	/* <div>
									<i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{' '}
									<h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
										ABC Motor Parts
									</h1>
								</div> */
}

{
	/* <div class="mt-6 block p-5 text-sm md:font-sans text-xs text-gray-800">
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

							*/
}

{
	/* <a class="" href="/login" data-test="Link">
								<span class="block p-5 text-center text-gray-800 text-xs">
									Already have an account?
								</span>
							</a> */
}
