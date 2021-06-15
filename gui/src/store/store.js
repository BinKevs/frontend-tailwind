import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './reducers/indexReducer';
const initialState = {};
const middleware = [thunk];
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	combineReducers,
	initialState,
	composeEnhances(applyMiddleware(...middleware))
);
export default store;
