import { IndeterminateCheckBox, AddBox, Delete } from '@mui/icons-material';
import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';
import './item-styles.css';
import {CartItem} from "../../../shared/shareddtypes";

type Props = {
    item: CartItem
    inCheckout?: boolean
}

const Item = (props: Props) => {
    const {item, inCheckout} = props
    const { dispatch } = useContext(CartContext);
    const apiEndPoint = process.env.REACT_APP_API_URI
	let name = item.name
	if (name.length > 8) {
		name = name.substring(0,8 ) + "..."
	}
    return (
        <>
            <div className='shopping-cart-item'>
                    <div className="item-action">
                    <Button
                        hidden={inCheckout}
                        variant='secondary'
                        onClick={() => dispatch({
                            payload: item,
                            type: 'ADD'
                        })}>
                        <AddBox/>
                    </Button>
                    <span>{item.amount}</span>
                    <Button
                        hidden={inCheckout}
                        variant='secondary'
                        onClick={() => dispatch({
                            payload: item._id,
                            type: 'REMOVE'
                        })}>
                        <IndeterminateCheckBox/>
                    </Button>
                </div>
                <div className="item-detail">
                    <div className="item-detail-image">
                        <img src={apiEndPoint + "/public/images/" + item._id + ".jpg"} alt={item.name} />
                    </div>
                    <div className="item-detail-info">
                        <div className="item-detail-info-name">
                            {name}
                        </div>
                        <div className="item-detail-info-prices">
                            <span>{item.price}€</span>
                        </div>
                    </div>
                    <div className="item-action-remove">
                        <Button
                            hidden={inCheckout}
                            variant='danger'
                            title='Remove product'
                            onClick={() => dispatch({
                                payload: item._id,
                                type: 'REMOVE-ALL'
                            })}>
                            <Delete/>
                        </Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Item;