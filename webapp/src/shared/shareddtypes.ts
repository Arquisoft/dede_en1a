export type ProductFetch = {
    products: Product[],
    isLoading: boolean;
    isError: boolean;
}

export type Product = {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
}

export type CartItem = {
    id?: number;
    title: string;
    image?: string;
    price: number;
    amount: number;
}

export type CartActionReducer = {
    payload: any;
    type: 'ADD' | 'REMOVE' | 'REMOVE-ALL' | 'CLEAR';
}

export type CartContextType = {
    cartItems: CartItem[],
    dispatch: React.Dispatch<CartActionReducer>
}

export type Customer = {
    name: string;
    lastName: string;
    email: string;
    address: string;
}

export type Order = {
    customer: Customer,
    order_details: CartItem[]
}
