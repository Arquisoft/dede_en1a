import {useState} from "react";
import {BrowserRouter as Router, Route, Switch, MemoryRouter} from "react-router-dom";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import {CartProvider} from "./context/CartContext";
import DetailsView from "./pages/DetailsView/DetailsView";


const App = () => {

    const [show, setShow] = useState(false);
    return (
        <Router>
            <CartProvider>
                <Navigation handleOpen={setShow}/>
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