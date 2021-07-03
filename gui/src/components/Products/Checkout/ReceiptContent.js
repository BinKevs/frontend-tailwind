import React from 'react';
let DateNow = Date().toLocaleString().split(' ');

export class ReceiptContent extends React.PureComponent {
	render() {
		return (
			<div className="p-10">
				<div class="mb-8 flex justify-between">
					<div>
						<h2 class="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">
							Invoice
						</h2>

						<div class="mb-1 flex items-center">
							<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
								Invoice No.
							</label>
							<span class="mr-4 inline-block">:</span>
							INV-0001
						</div>
						<div class="mb-1 flex items-center">
							<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
								Issued By :
							</label>
							<span class="mr-4 inline-block">:</span>
							{this.props.user.last_name + ' ' + this.props.user.first_name}
						</div>
						<div class="mb-1 flex items-center">
							<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
								Invoice Date
							</label>
							<span class="mr-4 inline-block">:</span>
							{DateNow[0] +
								' ' +
								DateNow[1] +
								' ' +
								DateNow[2] +
								' ' +
								DateNow[3] +
								' ' +
								DateNow[4]}
						</div>

						{/* <div class="mb-1 flex items-center">
							<label class="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
								Due date
							</label>
							<span class="mr-4 inline-block">:</span>
							
							123123
						</div> */}
					</div>
					<div class="pr-5">
						{/* <div class="w-32 h-32 mb-1 overflow-hidden">
							<img id="image2" class="object-cover w-20 h-20" />
						</div> */}
						<div>
							<i class="far fa-motorcycle fa-3x mb-3 inline-block"></i>{' '}
							<h1 class="font-Montserrat text-gray-800 text-2xl inline-block">
								ABC Motor Parts
							</h1>
						</div>
					</div>
				</div>
				{/* <div class="flex justify-between mb-10">
					<div class="w-1/2">
						<label class="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">
							Bill/Ship To:
						</label>
						<div>
							
							123123
						</div>
					</div>
					<div class="w-1/2">
						<label class="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">
							From:
						</label>
						<div>
							
							123123
						</div>
					</div>
				</div> */}
				<div class="flex flex-wrap -mx-1 border-b py-2 items-start">
					<div class="flex-1 px-1">
						<p class="text-gray-600 uppercase tracking-wide text-xs font-bold">
							Description
						</p>
					</div>

					<div class="px-1 w-32 text-right">
						<p class="text-gray-600 uppercase tracking-wide text-xs font-bold">
							Units
						</p>
					</div>

					<div class="px-1 w-32 text-right">
						<p class="leading-none">
							<span class="block uppercase tracking-wide text-xs font-bold text-gray-600">
								Unit Price
							</span>
							{/* <span class="font-medium text-xs text-gray-500">(Incl. GST)</span> */}
						</p>
					</div>

					<div class="px-1 w-32 text-right">
						<p class="leading-none">
							<span class="block uppercase tracking-wide text-xs font-bold text-gray-600">
								Amount
							</span>
							{/* <span class="font-medium text-xs text-gray-500">(Incl. GST)</span> */}
						</p>
					</div>
				</div>
				{this.props.cartItems.map((item) => (
					<div class="flex flex-wrap -mx-1 py-2 border-b">
						<div class="flex-1 px-1">
							<p class="text-gray-800">{item.product_name}</p>
						</div>

						<div class="px-1 w-32 text-right">
							<p class="text-gray-800">{item.quantity}</p>
						</div>

						<div class="px-1 w-32 text-right">
							<p class="text-gray-800">₱{item.price}</p>
						</div>

						<div class="px-1 w-32 text-right">
							<p class="text-gray-800">₱{item.price * item.quantity}</p>
						</div>
					</div>
				))}
				<div class="py-2 ml-auto mt-20" style={{ width: '320px' }}>
					<div class="flex justify-between mb-3">
						<div class="text-gray-800 text-right flex-1">Sub Total </div>
						<div class="text-right w-40">
							<div class="text-gray-800 font-medium">{this.props.Subtotal}</div>
						</div>
					</div>
					<div class="flex justify-between mb-4">
						<div class="text-sm text-gray-600 text-right flex-1">TAX</div>
						<div class="text-right w-40">
							<div class="text-gray-800 font-medium">{this.props.tax}</div>
						</div>
					</div>

					<div class="py-2 border-t border-b">
						<div class="flex justify-between">
							<div class="text-xl text-gray-600 text-right flex-1">Total</div>
							<div class="text-right w-40">
								<div class="text-gray-800 font-medium">
									{this.props.totalAmount}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
