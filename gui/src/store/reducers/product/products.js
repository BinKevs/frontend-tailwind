import {
	GET_PRODUCT_LIST,
	GET_PRODUCT,
	DELETE_PRODUCT,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	GET_CATEGORY_LIST,
	ADD_CATEGORY,
	DELETE_CATEGORY,
	PRODUCT_LOADING,
} from '../../actions/product/actionTypes';

const initialState = {
	products: [],
	product: {},
	categories: [],
	isLoading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_PRODUCT_LIST:
			return {
				...state,
				products: action.payload,
				isLoading: false,
			};
		case GET_PRODUCT:
			return {
				...state,
				product: action.payload,
			};
		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(
					(product) => product.id !== action.payload
				),
			};
		case ADD_PRODUCT:
			return {
				...state,
				products: [...state.products, action.payload],
			};
		case UPDATE_PRODUCT:
			return {
				...state,
				product: action.payload,
			};
		case GET_CATEGORY_LIST:
			return {
				...state,
				categories: action.payload,
			};
		case ADD_CATEGORY:
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(
					(category) => category.id !== action.payload
				),
			};
		default:
			return state;
	}
}
