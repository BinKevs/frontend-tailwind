import { Route, Switch } from 'react-router-dom';
import ProductListIndex from './components/Products/ProductListIndex';
import ProductSetting from './components/Products/ProductSetting';
import DashboardIndex from './components/Dashboard/dashboard';
import InventorySetting from './components/Inventories/InventorySetting';
import SupplierSetting from './components/Suppliers/SupplierSetting';
import TransactionSetting from './components/Transactions/TransactionSetting';
import TransactionItemsSetting from './components/Transactions/TransactionItemsSetting';
import ReportIndex from './components/Reports/ReportIndex';
import CheckoutIndex from './components/Products/Checkout/CheckoutIndex';
const BaseRouter = () => (
	<>
		<Switch>
			<Route exact path="/products" component={ProductListIndex} />
			<Route exact path="/products/settings" component={ProductSetting} />
			<Route exact path="/dashboard" component={DashboardIndex} />
			<Route exact path="/inventories" component={InventorySetting} />
			<Route exact path="/supplier" component={SupplierSetting} />
			<Route exact path="/transactions" component={TransactionSetting} />
			<Route
				exact
				path="/transactions/items"
				component={TransactionItemsSetting}
			/>
			<Route exact path="/reports" component={ReportIndex} />
			<Route exact path="/checkout" component={CheckoutIndex} />
		</Switch>
	</>
);

export default BaseRouter;