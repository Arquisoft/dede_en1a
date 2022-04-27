import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import {CartProvider} from "./context/CartContext";
import DetailsView from "./pages/DetailsView/DetailsView";
import {useSession} from "@inrupt/solid-ui-react";
import { createToken } from "../auth/generateToken";


const App = () => {
    const [show, setShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {session} = useSession()

    useEffect(() => {
        if(isLoggedIn && session.info.webId)
            localStorage.setItem("webId", session.info.webId)
        else
            localStorage.removeItem("webId")
    }, [isLoggedIn, session.info.webId])

    session.onLogin(() => {
        setIsLoggedIn(true)
        let token = createToken(session.info.webId)
        localStorage.setItem("token", token)
    })

    session.onLogout(() => {
        setIsLoggedIn(false)
		localStorage.removeItem("token")
    })

    return (
        <Router>
            <CartProvider>
                <Navigation isLoggedIn={isLoggedIn} handleOpen={setShow}/>
                {show && <Sidebar handleClose={setShow}/>}
                <Switch>
                    <Route path="/product/:_id">
                        <DetailsView/>
                    </Route>
                </Switch>
            </CartProvider>
        </Router>
    );
}

export default App;