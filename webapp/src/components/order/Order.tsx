import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import {calculateTotal, calculateTotalPlusShiping, getTotalItems} from '../../helpers/calculate';

type Props = {
    address: string[],
	shipping: {
		price: number,
		distance: number
	}
}

const OrderSummary = (props: Props) => {

    const {address, shipping} = props
    
    const { cartItems } = useContext(CartContext);

    

    return (
        <div className='col-md-5 col-lg-4 order-md-last'>
            <h4 className='d-flex justify-content-between align-items-center mb-3'>
                <span className='text-primary'>Order summary</span>
                <span className='badge bg-primary rounded-pill'>{getTotalItems(cartItems)}</span>
            </h4>
            <ul className='list-group mb-3'>
                {
                    cartItems.map(item => (
                        <li
                            key={item._id}
                            className='list-group-item d-flex justify-content-between lh-sm'>
                            <div>
                                <h5 className='checkout-title'>{ item.name }</h5>
                                <small className='text-muted'>Quantity: { item.amount }</small>
                            </div>
                            <div className="text-muted">{item.price}€</div>
                        </li>
                    ))
                }
                <li className='list-group-item d-flex justify-content-between'>
                    <span>TOTAL PRODUCTS (EUR)</span>
                    <strong>{ calculateTotal(cartItems).toFixed(2)}€</strong>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                    <span>SHIPPING (EUR)</span>
                    <strong>{shipping.price?.toFixed(2)?? 0.0 }€</strong>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                    <span>TOTAL (EUR)</span>
                    <strong>{ calculateTotalPlusShiping(cartItems, shipping.price).toFixed(2)}€</strong>
                </li>
            </ul>
        </div>
    )
}

export default OrderSummary;