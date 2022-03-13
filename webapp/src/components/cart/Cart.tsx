import React from 'react'
import {useContext} from 'react';
import {CartContext} from '../../context/CartContext';
import Item from './item/Item';
import Footer from "../footer/Footer";
import './cart-styles.css';


const Cart = () => {
    const {cartItems} = useContext(CartContext);

    if (!cartItems.length) return <h5>Cart is empty</h5>;

    return (
        <div className='shopping-cart'>
            {
                cartItems.map(item => (
                    <Item
                        key={item.id}
                        item={item}/>
                ))
            }
            <Footer/>
        </div>
    )
}

export default Cart;