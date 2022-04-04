import { Button } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import ProductInfo from './sections/ProductInfo';
import ProductImage from './sections/ProductImage';
import React, { useState, useEffect, useContext } from 'react';
import './DetailsView.css'
import { useParams } from 'react-router';
import Axios from 'axios';
import {Product} from '../../shared/shareddtypes';
import { CartContext } from '../../context/CartContext';


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
    
    const [item, setItem] = useState<Product>()

    useEffect(() => {
        const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
        Axios.get(apiEndPoint + '/product/details/' + _id).then(
            response => {
                const product = response.data
                setItem(product) 
                console.log(response.data)
            }
        );
    },
    [_id]);

    if (item) return(
        <Grid container className="centered" data-testid="details">
            <Grid item xs={0} md={2} lg={3}/>
            <Grid item xs={12} md={4} lg={3}>
                <ProductImage item={item}/>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <ProductInfo item={item}/>
            </Grid>
            <Grid item xs={0} md={2} lg={3}/>
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