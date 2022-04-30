import React from 'react'
import {useContext} from 'react';
import {CartContext} from '../../context/CartContext';
import Item from './item/Item';
import CartFooter from "../cartFooter/CartFooter";
import './cart-styles.css';

type Props = {
    setIsInCheckout: (isInCheckout: boolean) => void
    handleClose?: (close: boolean) => void
}

const Cart = (props: Props) => {
    const {setIsInCheckout, handleClose} = props
    const {cartItems} = useContext(CartContext);

    if (!cartItems.length) return <p><b>Cart is empty</b></p>;

    return (
        <div className='shopping-cart'>
            {
                cartItems.map(item => (
                    <Item
                        key={item._id}
                        item={item}/>
                ))
            }
            <CartFooter setIsInCheckout={setIsInCheckout} handleClose={handleClose}/>
        </div>
    )
}

export default Cart;