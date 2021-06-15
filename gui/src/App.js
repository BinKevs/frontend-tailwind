import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import BaseRouter from './Routes';
import store from './store/store';
import Login from './components/Accounts/Login';
import Registration from './components/Accounts/Registration';
function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/Login" component={Login} />
						<Route exact path="/Register" component={Registration} />
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
