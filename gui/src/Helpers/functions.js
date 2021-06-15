export function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
export function HandleDecimalPlaces(Variable) {
	return Math.round((Variable + Number.EPSILON) * 100) / 100;
}
