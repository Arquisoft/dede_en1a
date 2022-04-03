import React from 'react'
import {useContext} from 'react';
import {CartContext} from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';
import {Product} from "../../shared/shareddtypes";
import CartProduct from './product/CartProduct';
import LinearProgress from "@mui/material/LinearProgress";
import Grid from '@mui/material/Grid';


const ListProducts = () => {

    const {dispatch} = useContext(CartContext);

    const {products, isLoading} = useFetch();

    const handleAddToCart = (product: Product) => {
        dispatch({
            payload: product,
            type: 'ADD'
        });
    }

    const renderCards = products.map(product => {
        return (
            <Grid key={product._id} item container xs={12} sm={6} md={4} lg={3}>
                <CartProduct
                    key={product._id}
                    product={product}
                    handleAddToCart={handleAddToCart}/>
            </Grid>
        )
    })

    if (isLoading) return <LinearProgress/>;

    return (
        <div>
            <Grid container justifyContent="center" spacing={4}>
                {renderCards}
            </Grid>
            {/*<PaginationContainer />*/}
        </div>
    )
}

export default ListProducts;