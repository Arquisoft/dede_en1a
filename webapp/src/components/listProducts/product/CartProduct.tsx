import {Product} from "../../../shared/shareddtypes";
import './styles.css';
import {useHistory} from "react-router-dom";
import { CardContent, CardMedia, Typography, Card, Button, CardActionArea, styled} from "@mui/material";

type Props = {
    product: Product;
    handleAddToCart: (product: Product) => void;
}

const StyledButton = styled(Button)({
	justifySelf: "center",
	width: "100%"
})

const StyledCard = styled(Card)({
	transition: "transform .2s",
	'&:hover': {
		transform: "scale(1.05)"
	}
})


const CartProduct = ({product, handleAddToCart}: Props) => {
    let history = useHistory();
    let imgPath = "./images/".concat(product.image).concat(".jpg");
    return (
		<div>
			<StyledCard sx={{width: '15rem', margin: '5px'}}>
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
			</StyledCard>
			<div style={{display: "grid", gap:"5px", margin:"1rem"}}>
				<StyledButton variant="contained" onClick={() => history.push("product/" + product._id)}>
					Product Details
				</StyledButton>
				<StyledButton variant="contained"  onClick={() => handleAddToCart(product)}>
					Add to cart
				</StyledButton>
			</div>
		</div>
    )
}

export default CartProduct;