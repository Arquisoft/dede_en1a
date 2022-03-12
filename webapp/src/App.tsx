import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import { CartProvider } from "./context/CartContext";

const App = () => {

    const [show, setShow] = useState(false);
    return (
        <Router>
            <CartProvider>
                <Navigation handleOpen={ setShow }/>
                { show && <Sidebar handleClose={ setShow }/>}
            </CartProvider>
        </Router>
    );
}

export default App;