import Button from '@mui/material/Button';
// Types
import { Product} from "../shared/shareddtypes";
// Styles
import {Wrapper} from './Item.styles';

type Props = {
    item: Product;
    handleAddToCart: (clickedItem: Product) => void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => (
    <Wrapper>
        <img src={item.image} alt={item.name} />
        <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <h3>{item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
);

export default Item;