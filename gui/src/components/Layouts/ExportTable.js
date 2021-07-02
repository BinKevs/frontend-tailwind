import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const ExportTable = (props) => {
	const { table_export_modal, OnToggleExportTable } = props;
	return (
		<>
			<div class={table_export_modal ? 'h-screen ' : 'h-screen hidden'}>
				<div class="mx-auto max-w-screen-lg h-full">
					<div
						className="z-20 absolute top-0 right-0 bottom-0 left-0"
						id="modal"
					>
						<div class="modal-overlay absolute w-full h-full z-25 bg-gray-900 opacity-50"></div>
						<div className="h-full overflow-auto w-1/2 mx-auto flex flex-col">
							<div className="m-2 md:m-12">
								<form class="mt-9">
									<div className="relative p-4 md:p-8 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400 ">
										<div class="text-left p-0 mb-8">
											<div>
												<i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{' '}
												<h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
													ABC Motor Parts
												</h1>
											</div>

											<h1 class="text-gray-800 text-3xl font-medium">
												Export to :{' '}
											</h1>
										</div>
										<ReactHTMLTableToExcel
											className="bg-green-600 h-12 rounded text-white w-full"
											table="inventory-table"
											filename="inventory-table"
											sheet="inventory-table"
											buttonText="Excel"
										/>
										<button className="bg-blue-500 h-12 rounded text-white w-full my-8">
											Word
										</button>
										<div class="text-left p-0 mb-8">
											<h1 class="text-gray-800 text-3xl font-medium">
												Or print it :{' '}
											</h1>
										</div>
										<button className="bg-gray-500 h-12 rounded text-white w-full">
											Print
										</button>
										<div
											onClick={OnToggleExportTable}
											className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out"
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

export default ExportTable;
