import {Button, Card} from 'react-bootstrap';
import ButtonBase from "@mui/material/ButtonBase";
import {Product} from "../../../shared/shareddtypes";
import './styles.css'
import React from "react";
import {useHistory} from "react-router-dom";

type Props = {
    product: Product;
    handleAddToCart: (product: Product) => void;
}

const CartProduct = ({product, handleAddToCart}: Props) => {
    let history = useHistory();
    let imgPath = "./images/".concat(product.image).concat(".jpg");
    return (
        <Card className="card-product" style={{width: '15rem', margin: '5px'}}>
            <ButtonBase onClick={() => history.push(`product/${product._id}`)}>
                <Card.Img variant="top" src={imgPath}
                          className='card-img'/>
            </ButtonBase>
            <Card.Body className="card-product-body">
                <Card.Title className='card-title'>{product.name}</Card.Title>
                Price: {product.price}€
                <Button className="button-details" href={`product/${product._id}`}>Product Details</Button>
                <Button className='button-add' variant="primary" onClick={() => handleAddToCart(product)}>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}

export default CartProduct;