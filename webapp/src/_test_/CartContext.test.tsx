import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { CartProvider, CartContext } from '../context/CartContext';
import Cart from '../components/cart/Cart';
import { mount } from 'enzyme';

describe("Cart context ", () => {
    it("returns a list of products ", () => {
        const TestComponent = () => {
            const {cartItems} = React.useContext(CartContext)

            return <>
                <div data-testid="products">
                {
                cartItems.map(item => (
                    <div>{item._id}: {item}</div>
                ))
                }
                </div>
            </>
        }

        const wrapper = render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        )

        expect(wrapper).toBeTruthy();

    })
})