import {Route, Switch} from 'react-router-dom';
import NavBar from "./NavBar";
import Home from "./Home";
import LoadingSession from "./LoadingSessionComponent"
import OrdersPage from "../pages/orders/OrdersPage";
import {NavigationProps} from "../shared/shareddtypes";
import {SelectProviderComponent} from "./userAuthentication/SelectProviderComponent";
import {Box} from "@mui/material";
import {DisplayProductsComponent} from "./checkout/DisplayProductsComponent";
import {DisplayShippingDataComponent} from "./checkout/DisplayShippingDataComponent"
import {DisplayOrderSummaryComponent} from "./checkout/DisplayOrderSummaryComponent";
import {CheckoutSuccessComponent} from "./checkout/CheckoutSuccessComponent";
import AdminLogin from "./userAuthentication/AdminLogIn";
import AdminPanel from "../pages/admin/AdminPanel";
import { LoginDeDe } from './userAuthentication/loginLogogut/LoginDeDe';
import { SignupDeDe } from './userAuthentication/loginLogogut/SignupDeDe';

const Navigation = (props: NavigationProps) => {
    const {isLoggedIn, handleOpen} = props
    return (
        <Box>
            <Box>
                <NavBar isLoggedIn={isLoggedIn} handleOpen={handleOpen}/>
            </Box>
            <Box>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path={'/checkout/displayProducts'} component={DisplayProductsComponent}/>
                    <Route exact path={"/checkout/shippingData"} component={DisplayShippingDataComponent}/>
                    <Route exact path={"/checkout/summary"} component={DisplayOrderSummaryComponent}/>
                    <Route exact path={"/checkout/success"} component={CheckoutSuccessComponent}/>
                    <Route exact path='/orders/list' component={OrdersPage}/>
                    <Route exact path='/solid/login/:webID/:sessionId' component={LoadingSession}/>
                    <Route exact path='/selectProvider' component={SelectProviderComponent}/>
                    <Route exact path='/admin' component={AdminLogin}/>
                    <Route exact path='/admin/panel' component={AdminPanel}/>
					<Route exact path='/dede/login' component={LoginDeDe}/>
					<Route exact path='/dede/signup' component={SignupDeDe}/>
                </Switch>
            </Box>
        </Box>
    )
}

export default Navigation;