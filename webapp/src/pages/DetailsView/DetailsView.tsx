/*
import getProduct from '../../helpers/getProduct';
*/

import {Button} from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import ProductInfo from './sections/ProductInfo';
import ProductImage from './sections/ProductImage';
import React, { useState, useEffect, useContext } from 'react';
import './DetailsView.css'
import { useParams } from 'react-router';
import Axios from 'axios';
import {Product} from '../../shared/shareddtypes';
import { CartContext } from '../../context/CartContext';

/*
type Props = {
    item: Product;
    handleAddToCart: (clickedItem: Product) => void;
};
*/

const DetailsView: React.FC = () => {

    const { _id }: {_id: string} = useParams();

    const { dispatch } = useContext(CartContext);

    const handleAddToCart = (product: Product) => {
        console.log("item added to cart")
        dispatch({
            payload: product,
            type: 'ADD'
        });
    }

    /* trouble shooting
    console.log(_id)
    console.log("Details View successfully loaded")
    */
    
    const [item, setItem] = useState<Product>()

    useEffect(() => {
        Axios.get(`http://localhost:5000/product/details/${_id}`).then(
            response => {
                const product = response.data
                setItem(product) 
                console.log(response.data)
            }
        );
    },
    [_id]);

    if (item) return(
        <Grid container className="centered">
            <Grid item xs={3}/>
            <Grid item xs={3}>
                <ProductImage item={item}/>
            </Grid>
            <Grid item xs={3}>
                <ProductInfo item={item}/>
            </Grid>
            <Grid item xs={3}/>
            <Button className='button-add' variant="primary" onClick={() => handleAddToCart(item)}>Add to cart</Button>
        </Grid>
    )

    return(
        <>
            {/* ERROR: item not found */}
        </>
        /*
        */
    );
};


export default DetailsView