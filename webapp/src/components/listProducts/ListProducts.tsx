import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';
import { Product } from "../../shared/shareddtypes";
import CartProduct from './product/CartProduct';
import LinearProgress from "@mui/material/LinearProgress";

const ListProducts = () => {

    const { dispatch } = useContext(CartContext);

    const { products, isLoading } = useFetch();

    const handleAddToCart = (product: Product) => {
        dispatch({
            payload: product,
            type: 'ADD'
        });
    }

    if(isLoading) return <LinearProgress/>;

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
            {
                products.map(product => (
                    <CartProduct
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}/>
                ))
            }
        </div>
    )
}

export default ListProducts;