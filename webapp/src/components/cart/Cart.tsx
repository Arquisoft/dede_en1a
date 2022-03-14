import React from 'react'
import {useContext} from 'react';
import {CartContext} from '../../context/CartContext';
import Item from './item/Item';
import CartFooter from "../footer/CartFooter";
import './cart-styles.css';


const Cart = () => {
    const {cartItems} = useContext(CartContext);

    if (!cartItems.length) return <p/>;

    return (
        <div className='shopping-cart'>
            {
                cartItems.map(item => (
                    <Item
                        key={item._id}
                        item={item}/>
                ))
            }
            <CartFooter/>
        </div>
    )
}

export default Cart;