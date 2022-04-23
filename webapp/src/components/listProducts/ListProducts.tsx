import React from 'react'
import {useContext, useState} from 'react';
import {CartContext} from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';
import {Product} from "../../shared/shareddtypes";
import CartProduct from './product/CartProduct';
import LinearProgress from "@mui/material/LinearProgress";
import Grid from '@mui/material/Grid';


const getFilteredItems = (query: any, products: any) => {
    console.log("Items are filtered");
    if (!query){
        return products;
    }
    return products.filter((product: any) => product.name.includes(query));
}

const ListProducts = () => {

    const {dispatch} = useContext(CartContext);

    const {products, isLoading} = useFetch();

    const [query, setQuery] = useState("Screw");

    const filteredItems = getFilteredItems(query, products);

    const handleAddToCart = (product: Product) => {
        dispatch({
            payload: product,
            type: 'ADD'
        });
    }

    const renderCards = filteredItems.map((product: Product) => {
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
            <label>Search</label>
            <input 
                type="text" 
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
            
            <Grid container justifyContent="center" spacing={4}>
                {renderCards}
            </Grid>
            {/*<PaginationContainer />*/}
        </div>
    )
}

export default ListProducts;