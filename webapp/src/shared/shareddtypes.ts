export type ProductFetch = {
    products: Product[],
    isLoading: boolean;
    isError: boolean;
}

export type OrdersFetch = {
    orders: Order[],
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
    surname: string;
    address: string;
}

export type Order = {
    _id: string,
    date: Date,
    shipping?: number,
    totalPrice?: number,
    address: string,
    items: CartItem[]
}

export type OrderAdd = {
    webId: string,
    shipping?: number,
    totalPrice?: number,
    customer: Customer,
    items: CartItem[]
}

