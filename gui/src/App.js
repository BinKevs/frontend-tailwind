import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import BaseRouter from './Routes';
import store from './store/store';
import Login from './components/Accounts/Login';
import Registration from './components/Accounts/Registration';
import ProductList from './components/Reviews/ProductList';
import ProductDetail from './components/Reviews/ProductDetail';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Registration} />
						<Route exact path="/review/product-list" component={ProductList} />
						<Route
							exact
							path="/review/product/:productID/"
							component={ProductDetail}
						/>
						<Layout>
							<BaseRouter />
						</Layout>
					</Switch>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
