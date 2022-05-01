import React from 'react'
import {useContext, useState} from 'react';
import {CartContext} from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';
import {Product} from "../../shared/shareddtypes";
import CartProduct from './product/CartProduct';
import LinearProgress from "@mui/material/LinearProgress";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

const getFilteredItems = (query: any, priceRange: any, sortBy: any, products: any) => {
    //console.log("Items are filtered");
    let filteredProducts: any = products;
    // console.log(filteredProducts);

    if (query) {
        filteredProducts = filteredProducts.filter((product: any) => product.name.toLowerCase().includes(query.toLowerCase()));
    }

    if (sortBy) {
        // console.log("Order: ");
        // console.log(sortBy);
        if (sortBy === 1) {
            // console.log("A-Z");
            filteredProducts = filteredProducts.sort((a: any, b: any) => a.name.localeCompare(b.name));
        } else if (sortBy === 2) {
            // console.log("Ascending");
            filteredProducts = filteredProducts.sort((a: any, b: any) => a.price - b.price);
        } else {
            // console.log("Descending");
            filteredProducts = filteredProducts.sort((a: any, b: any) => b.price - a.price);
        }

        /*
        filteredProducts = filteredProducts.sort( (a: any, b: any) => {
            const isReversed = (sortBy === 'asc') ? 1 : -1;
            return isReversed * a._name.localCompare(b._name);
        } )
        */
    }

    if (priceRange) {
        // console.log("There is a price range");
        if (priceRange === 10) {
            filteredProducts = filteredProducts.filter((product: any) => product.price <= 10);
        } else if (priceRange === 100) {
            filteredProducts = filteredProducts.filter((product: any) => product.price <= 100);
        } else if (priceRange === 1000) {
            filteredProducts = filteredProducts.filter((product: any) => product.price <= 1000);
        }
    }

    //return products.filter((product: any) => product.name.toLowerCase().includes(query.toLowerCase()));
    return filteredProducts;
}

const ListProducts = () => {

    const {dispatch} = useContext(CartContext);

    const {products, isLoading} = useFetch();

    const [query, setQuery] = useState('');
    const [priceRange, setRange] = useState('');
    const [sortBy, setSort] = useState('');

    const filteredItems = getFilteredItems(query, priceRange, sortBy, products);

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
            <Grid container justifyContent="center" spacing={4}>
                <Grid item xs={6}>
                    <input
                        type="text"
                        placeholder="Search items..."
                        onChange={(e) => setQuery(e.target.value)}/>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="price-range-select-label">Price Range</InputLabel>
                        <Select
                            labelId="price-range-select-label"
                            id="price-range-select"
                            value={priceRange}
                            label="Price Range"
                            onChange={(event: SelectChangeEvent) => {
                                setRange(event.target.value as string)
                            }}
                        >
                            <MenuItem value={10}> Less than 10€ </MenuItem>
                            <MenuItem value={100}> Less than 100€ </MenuItem>
                            <MenuItem value={1000}> Less than 1000€ </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="sort-select-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-select-label"
                            id="sort-select"
                            value={sortBy}
                            label="Price Range"
                            onChange={(event: SelectChangeEvent) => {
                                setSort(event.target.value as string)
                            }}
                        >
                            <MenuItem value={1}>A-Z</MenuItem>
                            <MenuItem value={2}>Ascending price</MenuItem>
                            <MenuItem value={3}>Descending price</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {renderCards}
            </Grid>
        </div>
    )
}

export default ListProducts;