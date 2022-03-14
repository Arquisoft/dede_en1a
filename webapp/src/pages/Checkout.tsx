import React from 'react'
import { Container,  Row } from 'react-bootstrap';
import Form from "../components/Form";
import OrderSummary from "../components/Order";

const Checkout = () => {
    return (
        <Container>
            <div className='py-5 text-center'>
                <h2>Last step</h2>
                <p className='lead'>To proceed, please fill this form</p>
            </div>
            <Row>
                <Form />
                <OrderSummary />
            </Row>
        </Container>
    )
}

export default Checkout;