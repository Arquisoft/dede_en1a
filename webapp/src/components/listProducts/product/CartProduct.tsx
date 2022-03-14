import { Button, Card } from 'react-bootstrap';
import {Product} from "../../../shared/shareddtypes";
import './styles.css'
import {Route, useHistory} from "react-router-dom";
import {ButtonBase} from "@mui/material";
import Home from "../../Home";
import React from "react";
import DetailsView from "../../../pages/DetailsView/DetailsView";

type Props = {
    product: Product;
    handleAddToCart: (product: Product) => void;
}

const CartProduct = ({product, handleAddToCart}: Props) => {
    const history = useHistory();
    return (
        <Card style={{ width: '15rem', margin: '5px' }}>
            <Card.Img variant="top"  src={product.image} className='card-img'/>
            <Card.Body>
                <Card.Title className='card-title'>{product.name}</Card.Title>
                Price: {product.price}€
                <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}

export default CartProduct;