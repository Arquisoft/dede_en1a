export type User = {
    name:string;
    email:string;
}

export type Product = {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    amount: number;
};

export type CartItem = {
    product: Product;
};