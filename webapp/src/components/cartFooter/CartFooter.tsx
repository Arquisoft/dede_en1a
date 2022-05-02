import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { calculateTotal } from '../../helpers/calculate';
import './styles.css';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useSession} from "@inrupt/solid-ui-react";

type Props = {
    setIsInCheckout: (isInCheckout: boolean) => void
    handleClose: (state: boolean) => void
}

const CartFooter = (props: Props) => {
    const {setIsInCheckout, handleClose} = props
    const { cartItems } = useContext(CartContext);
    const {session} = useSession()

    const handleClick = () => {
        handleClose(false)
        setIsInCheckout(true)
    }

    return (
        <div className='shopping-cart-footer'>
            <div className="cart-summary">
                <div className="cart-summary-row">
                    <div className='label'>Total</div>
                    <div className='value'>{ calculateTotal(cartItems).toFixed(2) }€</div>
                </div>
            </div>
            <div className="d-grid gap-2">
                {!session.info.isLoggedIn ?
                <label>Please log in your pod</label> :
                    <Button variant="contained" style={{color: 'white'}} onClick={handleClick} component={Link} to="/checkout/displayProducts">
                        Proceed with checkout
                    </Button>
                }
            </div>
        </div>
    )
}

export default CartFooter;