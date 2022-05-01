import React from 'react';
import {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import {CartProvider} from "./context/CartContext";
import DetailsView from "./pages/DetailsView/DetailsView";
import {useSession} from "@inrupt/solid-ui-react";
import { useUser } from "./context/UserContext";
import { Footer } from "./components/footer/Footer";


const App = () => {
    const [show, setShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isInCheckout, setIsInCheckout] = useState(false)
	const {logoutDeDe} = useUser()
    const {session} = useSession()

    session.onLogin(() => {
        setIsLoggedIn(true)
    })

    session.onLogout(() => {
        setIsLoggedIn(false)
		logoutDeDe()
    })

    return (	
		<Router>
			<CartProvider>
				<Navigation isInCheckout={isInCheckout} isLoggedIn={isLoggedIn} handleOpen={setShow}/>
				{show && <Sidebar setIsInCheckout={setIsInCheckout} handleClose={setShow}/>}
				<Switch>
					<Route path="/product/:_id">
						<DetailsView/>
					</Route>
				</Switch>
				<Footer/>
			</CartProvider>
		</Router>
    );
}

export default App;