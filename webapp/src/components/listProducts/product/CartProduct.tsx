import { Button, Card } from 'react-bootstrap';
import {Product} from "../../../shared/shareddtypes";
import './styles.css'

type Props = {
    product: Product;
    handleAddToCart: (product: Product) => void;
}

const CartProduct = ({product, handleAddToCart}: Props) => {
    return (
        <Card style={{ width: '15rem', margin: '5px' }}>
            <Card.Img variant="top"  src={product.image} className='card-img'/>
            <Card.Body>
                <Card.Title className='card-title'>{product.name}</Card.Title>
                <Card.Text className='card-description'>
                    {product.description}
                </Card.Text>
                Price: {product.price}€
                <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to cart</Button>
            </Card.Body>
        </Card>
    )
}

export default CartProduct;