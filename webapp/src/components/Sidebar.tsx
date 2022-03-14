import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import Cart from './cart/Cart';

type Props = {
    handleClose: (state: boolean) => void
}

const Sidebar = ({ handleClose}: Props) => {
    return (
        <Offcanvas
            show={true}
            onHide={() => handleClose(false)}
            placement='end' >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Cart />
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Sidebar;