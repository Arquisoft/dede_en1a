import {CartItem} from "../shared/shareddtypes";

export const calculateTotal = (cartItems: CartItem[]): number => {
    return cartItems.reduce((acum: number, item: CartItem) => acum + (item.amount * item.price),0);
}

export const calculateTotalPlusShiping = (cartItems: CartItem[], shipping : number): number => {
    let shippingCost = (shipping) ? shipping : 0.0
    return cartItems.reduce((acum: number, item: CartItem) => acum + (item.amount * item.price),0.0) + shippingCost;
}

export const getTotalItems = (cartItems: CartItem[]): number => {
    return cartItems.reduce((acum: number, item: CartItem) => acum + item.amount,0);
}