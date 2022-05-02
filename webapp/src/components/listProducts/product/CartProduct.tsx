import React from "react";
import {Product} from "../../../shared/shareddtypes";
import './styles.css';
import {useHistory} from "react-router-dom";
import Grid from '@mui/material/Grid';
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
	
    return (
		<Grid container spacing={1} data-testid={product._id} style={{justifyContent:"center"}}>
			<Grid item xs={12}>
				<StyledCard>
					<CardActionArea onClick={() => history.push("product/" + product._id)} sx={{height: "25em"}}>
						
						<CardMedia 
							component="img" 
							alt="image of product" 
							style={{height:"200px", width:"250px", margin:"auto"}} 
							image={product.image}
							/>
						<CardContent>
							<Typography gutterBottom variant="body1" component="div">
								{product.name}
							</Typography>
							<Typography variant="subtitle1" color="text.secondary">
								Price: {product.price}€
							</Typography>
						</CardContent>
					</CardActionArea>
				</StyledCard>
			</Grid>
			<Grid item xs={10}>
				<StyledButton variant="contained" id={product._id + '_details'} onClick={() => history.push("product/" + product._id)}>
					Product Details
				</StyledButton>
			</Grid>
			<Grid item xs={10}>
				<StyledButton variant="contained" id={product._id + '_cart'} onClick={() => handleAddToCart(product)}>
					Add to Cart
				</StyledButton>
			</Grid>
		</Grid>
    )
}

export default CartProduct;