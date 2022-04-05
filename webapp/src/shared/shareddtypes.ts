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

export type Order = {
    _id: string,
    createdAt: Date,
    shippingPrice?: number,
    totalPrice?: number,
    address: string,
    products: [{
<<<<<<< HEAD
        "product": string, "amount": number
=======
        "prod": string, "number": Number
>>>>>>> 49420779c0d7343065c6160c93105001b1567ce5
    }]
}

export type OrderAdd = {
    webId: string,
    shippingPrice?: number,
    totalPrice?: number,
    name: string,
    address: string,
    products: CartItem[]
}

