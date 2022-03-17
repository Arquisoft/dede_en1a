/*
import getProduct from '../../helpers/getProduct';
*/

import Button from '@mui/material/Button';
import {Card} from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import ProductInfo from './sections/ProductInfo';
import ProductImage from './sections/ProductImage';
import React, { useState, useEffect } from 'react';
import './DetailsView.css'
import { useParams } from 'react-router';
import Axios from 'axios';
import {Product} from '../../shared/shareddtypes';

/*
type Props = {
    item: Product;
    handleAddToCart: (clickedItem: Product) => void;
};
*/

const DetailsView: React.FC = () => {

    const { _id }: {_id: string} = useParams();

    console.log(_id)
    console.log("Details View successfully loaded")
    
    const [item, setItem] = useState<Product>()

    useEffect(() => {
        Axios.get(`http://localhost:5000/product/details/${_id}`).then(
            response => {
                const product = response.data
                setItem(product) 
                console.log(response.data)
            }
        );
    }, []);

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
        </Grid>
    )

    return(
        <>
            Testing In Progress
        </>
        /*
        */
    );
};


export default DetailsView