import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { calculateTotal } from '../../helpers/calculate';
import './styles.css';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useSession} from "@inrupt/solid-ui-react";

const CartFooter = () => {
    const { cartItems } = useContext(CartContext);
    const {session} = useSession()

    return (
        <div className='shopping-cart-footer'>
            <div className="cart-summary">
                <div className="cart-summary-row">
                    <div className='label'>Total</div>
                    <div className='value'>{ calculateTotal(cartItems).toFixed(2) } €</div>
                </div>
            </div>
            <div className="d-grid gap-2">
                {!session.info.isLoggedIn ?
                <label>Please log in your pod</label> :
                    <Button component={Link} to="/checkout">
                        Proceed with checkout
                    </Button>
                }

            </div>
        </div>
    )
}

export default CartFooter;