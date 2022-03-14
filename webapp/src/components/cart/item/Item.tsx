import { IndeterminateCheckBox, AddBox, Delete } from '@mui/icons-material';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';
import './item-styles.css';
import {CartItem} from "../../../shared/shareddtypes";

type Props = {
    item: CartItem
}

const Item = ({ item }: Props) => {

    const { dispatch } = useContext(CartContext);

    return (
        <>
            <div className='shopping-cart-item'>
                <div className="item-action">
                    <Button
                        variant='secondary'
                        onClick={() => dispatch({
                            payload: item,
                            type: 'ADD'
                        })}>
                        <AddBox/>
                    </Button>
                    <span>{item.amount}</span>
                    <Button
                        variant='secondary'
                        onClick={() => dispatch({
                            payload: item.id,
                            type: 'REMOVE'
                        })}>
                        <IndeterminateCheckBox/>
                    </Button>
                </div>
                <div className="item-detail">
                    <div className="item-detail-image">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="item-detail-info">
                        <div className="item-detail-info-name">
                            {item.title}
                        </div>
                        <div className="item-detail-info-prices">
                            <span>${item.price}</span>
                        </div>
                    </div>
                </div>
                <div className="item-action-remove">
                    <Button
                        variant='danger'
                        title='Remove product'
                        onClick={() => dispatch({
                            payload: item.id,
                            type: 'REMOVE-ALL'
                        })}>
                        <Delete/>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Item;