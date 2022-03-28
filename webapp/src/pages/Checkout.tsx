import React, {useState} from 'react'
import { Container,  Row } from 'react-bootstrap';
import Form from "../components/Form";
import OrderSummary from "../components/Order";

const Checkout = () => {
    const [address, setAddress] = useState("")

    return (
        <Container>
            <div className='py-5 text-center'>
                <h2>Last step</h2>
                <p className='lead'>To proceed, please fill this form</p>
            </div>
            <Row>
                <Form setNewAddress={setAddress}/>
                <OrderSummary address={address}/>
            </Row>
        </Container>
    )
}

export default Checkout;