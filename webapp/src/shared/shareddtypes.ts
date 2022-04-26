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
        "prod": String, "amount": Number
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

export type NavBarProps = {
    isLoggedIn: boolean,
    handleOpen: (state: boolean) => void
}

