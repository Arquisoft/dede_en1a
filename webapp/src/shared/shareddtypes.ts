export type User = {
    name:string;
    email:string;
}

export type Product = {
    name: string;
    description: string;
    price: number;
};

export type CartItem = {
    product: Product;
    amount: number;
};