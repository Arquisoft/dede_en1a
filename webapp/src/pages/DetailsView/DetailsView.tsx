import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';
import ProductInfo from './sections/ProductInfo';
import ProductImage from './sections/ProductImage';
import {Product} from '../../shared/shareddtypes';
import './DetailsView.css'

type Props = {
    item: Product;
    handleAddToCart: (clickedItem: Product) => void;
};

const DetailsView: React.FC<Props> = ({item, handleAddToCart}) =>(
    <Grid container className="centered">
        <Grid item xs={3}/>
        <Grid item xs={3}>
            <ProductImage item={item}/>
        </Grid>
        <Grid item xs={3}>
            <ProductInfo item={item}/>
            <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
        </Grid>
        <Grid item xs={3}/>
    </Grid>
);


export default DetailsView