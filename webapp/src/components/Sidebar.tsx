import React from 'react'
import {Offcanvas} from 'react-bootstrap';
import Cart from './cart/Cart';

type Props = {
    handleClose: (state: boolean) => void
    setIsInCheckout: (isInCheckout: boolean) => void
}

const Sidebar = ({handleClose, setIsInCheckout}: Props) => {
    return (
        <Offcanvas
            show={true}
            onHide={() => handleClose(false)}
            placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Cart setIsInCheckout={setIsInCheckout} handleClose={handleClose}/>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Sidebar;