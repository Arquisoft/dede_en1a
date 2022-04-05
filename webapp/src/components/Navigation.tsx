import {Route, Switch} from 'react-router-dom';
import Checkout from '../pages/Checkout';
import NavBar from "./NavBar";
import Home from "./Home";
import LoadingSession from "./LoadingSessionComponent"
import OrdersPage from "../pages/orders/OrdersPage";
import {NavBarProps} from "../shared/shareddtypes";

const Navigation = (props: NavBarProps) => {
    const {isLoggedIn, handleOpen} = props
    return (
        <>
            <NavBar isLoggedIn={isLoggedIn}handleOpen={handleOpen}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/checkout' component={Checkout}/>
                <Route exact path='/orders/list' component={OrdersPage}/>
                <Route exact path='/solid/login/:webID/:sessionId' component={LoadingSession}/>
            </Switch>
        </>
    )
}

export default Navigation;