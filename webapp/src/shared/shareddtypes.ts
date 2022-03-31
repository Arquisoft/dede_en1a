export type ProductFetch = {
    products: Product[],
    isLoading: boolean;
    isError: boolean;
}

export type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    weight: number;
}

export type CartItem = {
    _id?: string;
    name: string;
    image?: string;
    price: number;
    amount: number;
}

export type ContactData = {
    fn: string
    country: string
    locality: string
    region : string
    street_address: string
    postal_code: string
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
