import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { calculateTotal } from '../../helpers/calculate';
import './styles.css';
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";

const CartFooter = () => {
    const { cartItems } = useContext(CartContext);
    const history = useHistory()
    const navigateTo = () => history.push("/checkout")

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
                <label>Please log in your pod</label> :
                    <Button className='btn btn-primary' onClick={navigateTo}>Proceed with checkout</Button>
                }

            </div>
        </div>
    )
}

export default CartFooter;