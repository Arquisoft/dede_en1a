import React, {useState} from 'react';
import {useQuery} from 'react-query';
// Components
import Item from "./item/Item";
import Drawer from '@mui/material/Drawer';
import LinearProgress from "@mui/material/LinearProgress";
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
// Styles
import {Wrapper, StyledButton} from "./App.styles";
// Types
import {Product} from "./shared/shareddtypes";
import Cart from "./cart/Cart";
import {getProducts} from "./api/api";


const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as Product[]);
    const {data, isLoading, error} = useQuery<Product[]>('products', getProducts);
    console.log(data);

    const getTotalItems = (items: Product[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: Product) => {
        setCartItems(prev => {
            // Is item already added in the cart?
            const isItemInCart = prev.find(item => item.id === clickedItem.id)
            if (isItemInCart) {
                return prev.map(item =>
                    item.id === clickedItem.id
                        ? {...item, amount: item.amount + 1}
                        : item
                );
            }
            // First time item is added
            return [...prev, {...clickedItem, amount: 1}];
        });
    };

    const handleRemoveFromCart = (id: string) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, {...item, amount: item.amount - 1}];
                } else {
                    return [...ack, {...item}];
                }
            }, [] as Product[])
        );
    };

    if (isLoading) return <LinearProgress/>;
    if (error) return <div>Something went wrong ...</div>

    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddShoppingCartIcon/>
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default App;
