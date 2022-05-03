import axios from 'axios';
import {useContext, useEffect, useState} from 'react'
import { Container,  Row } from 'react-bootstrap';
import Form from "../components/checkout/Form";
import OrderSummary from "../components/order/Order";
import { CartContext } from '../context/CartContext';
import { calculateTotalPlusShiping } from '../helpers/calculate';

const Checkout = () => {
	const { cartItems } = useContext(CartContext);
    const [address, setAddress] = useState<string[]>([])
	const [shipping, setDistance] = useState({
        distance: 0.0,
        price: 0.0,
    })

	useEffect(() => {
        axios.post((process.env.REACT_APP_API_URI || "http://localhost:5000") + "/geocode",
            {
                "street":  address[3],
                "city":    address[2],
                "region":  address[1],
                "country": address[0],
            }).then(response => {
				setDistance(response.data)
				localStorage.setItem("totalPrice", calculateTotalPlusShiping(cartItems, shipping.price).toFixed(2));
        	});
    	}, [address])

    return (
        <Container data-testid="checkout">
            <div className='py-5 text-center'>
                <h2>Last step</h2>
                <p className='lead'>To proceed, please fill this form</p>
            </div>
            <Row>
                <Form setNewAddress={setAddress} shipping={shipping}/>
                <OrderSummary address={address} shipping={shipping}/>
            </Row>
        </Container>
    )
}

export default Checkout;