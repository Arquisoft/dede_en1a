import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { calculateTotal } from '../../helpers/calculate';
import './styles.css';
import {Button} from "@mui/material";

const CartFooter = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='shopping-cart-footer'>
            <div className="cart-summary">
                <div className="cart-summary-row">
                    <div className='label'>Total</div>
                    <div className='value'>$ { calculateTotal(cartItems).toFixed(2) }</div>
                </div>
            </div>
            <div className="d-grid gap-2">
                {(localStorage.getItem("loggedIn") == null) ?
                <label>Por favor inicia sesion en tu pod.</label> :
                    <Button className='btn btn-primary' onClick={() => {window.location.href="http://localhost:5000/solid/fetch/" + localStorage.getItem("webID")}}>Proceed with checkout</Button>
                }

            </div>
        </div>
    )
}

export default CartFooter;