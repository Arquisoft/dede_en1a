import {Product} from "../../../shared/shareddtypes";
import './styles.css';
import {useHistory} from "react-router-dom";
import { CardContent, CardMedia, Typography, Card, Button, CardActions, CardActionArea} from "@mui/material";

type Props = {
    product: Product;
    handleAddToCart: (product: Product) => void;
}


const CartProduct = ({product, handleAddToCart}: Props) => {
    let history = useHistory();
    let imgPath = "./images/".concat(product.image).concat(".jpg");
    return (
        <Card sx={{width: '15rem', margin: '5px'}}>
			<CardActionArea onClick={() => history.push("product/" + product._id)}>
				<div style={{height:'15rem'}}>
					<CardMedia component="img" alt="image of product" width="15rem" image={imgPath}/>
				</div>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{product.name}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						Price: {product.price}€
					</Typography>
				</CardContent>
			</CardActionArea>
			<div style={{display: "grid", gap:"5px"}}>
				<Button variant="contained" onClick={() => history.push("product/" + product._id)} sx={{width:"90%", justifySelf:"center"}}>
					Product Details
				</Button>
				<Button variant="contained"  onClick={() => handleAddToCart(product)} sx={{width:"90%", justifySelf:"center", marginBottom:"15px"}}>
					Add to cart
				</Button>
			</div>
        </Card>
    )
}

export default CartProduct;