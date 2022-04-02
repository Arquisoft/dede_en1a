import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Checkout from '../pages/Checkout';
import NavBar from "./NavBar";
import Home from "./Home";
import LoadingSession from "./LoadingSessionComponent"
//import CheckoutData from "./checkout/CheckoutDataComponent"
import LogoutSession from './logout/LogoutSessionComponent';

type Props = {
    handleOpen: (state: boolean) => void;
}

const Navigation = ({handleOpen}: Props) => {
    return (
        <>
            <NavBar handleOpen={handleOpen}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/checkout' component={Checkout}/>
                <Route exact path='/solid/login/:webID/:sessionId' component={LoadingSession}/>
                <Route exact path='/solid/logout' component={LogoutSession}/>
            </Switch>
        </>
    )
}

export default Navigation;