import { Route, Switch } from 'react-router-dom';
import ProductListIndex from '../components/Products/ProductListIndex';
import ProductSetting from '../components/Products/ProductSetting';
import DashboardIndex from '../components/Dashboard/dashboard';
import InventorySetting from '../components/Inventories/InventorySetting';
import SupplierSetting from '../components/Suppliers/SupplierSetting';
import TransactionSetting from '../components/Transactions/TransactionSetting';
import TransactionItemsSetting from '../components/Transactions/TransactionItemsSetting';
import ReportIndex from '../components/Reports/ReportIndex';
import CheckoutIndex from '../components/Products/Checkout/CheckoutIndex';
import ActivityLog from '../components/Accounts/ActivityLog';
import AttendanceLog from '../components/Accounts/AttendanceLog';
import AccountsIndex from '../components/Accounts/AccountsIndex';
import AccountSettingsMenu from '../components/Accounts/AccountSettingsMenu';
import PrivateRoute from '../Helpers/PrivateRoute';

const MainBaseRouter = () => (
	<>
		<Switch>
			<PrivateRoute exact path="/products" component={ProductListIndex} />
			<PrivateRoute
				exact
				path="/products/settings"
				component={ProductSetting}
			/>

			<PrivateRoute exact path="/dashboard" component={DashboardIndex} />
			<PrivateRoute exact path="/inventories" component={InventorySetting} />
			<PrivateRoute exact path="/supplier" component={SupplierSetting} />
			<PrivateRoute exact path="/transactions" component={TransactionSetting} />
			<PrivateRoute
				exact
				path="/transactions/items"
				component={TransactionItemsSetting}
			/>
			<PrivateRoute exact path="/reports" component={ReportIndex} />
			<PrivateRoute exact path="/checkout" component={CheckoutIndex} />
			<PrivateRoute exact path="/activity_log" component={ActivityLog} />
			<PrivateRoute exact path="/attendance_log" component={AttendanceLog} />
			<PrivateRoute exact path="/accounts" component={AccountsIndex} />
			<PrivateRoute
				exact
				path="/accounts/settings/menu"
				component={AccountSettingsMenu}
			/>
		</Switch>
	</>
);

export default MainBaseRouter;
