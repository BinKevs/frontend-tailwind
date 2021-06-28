import { Route, Switch } from 'react-router-dom';
import ProductList from '../components/Reviews/ProductList';
import ProductDetail from '../components/Reviews/ProductDetail';

const ReviewBaseRouter = () => (
	<>
		<Switch>
			<Route exact path="/review/product-list" component={ProductList} />
			<Route
				exact
				path="/review/product/:productID/"
				component={ProductDetail}
			/>
		</Switch>
	</>
);

export default ReviewBaseRouter;
