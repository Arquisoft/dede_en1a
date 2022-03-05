import {Product} from '../shared/shareddtypes';

/*
export async function getProducts():Promise<Product[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:3000/api'
    let response = await fetch(apiEndPoint+'/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}*/

export async function getProducts():Promise<Product[]>{
    var response : Product[]
    var p1, p2, p3 : Product;
    p1 = {id:"sfs", name:"Product 1", image:"dont" , description:"Description of product 1", price:10, amount: 0};
    p2 = {id:"ssg", name:"Product 2", image:"dont2" , description:"Description of product 2", price:14, amount: 0};
    p3 = {id:"gdgdg", name:"Product 3", image:"dont3" , description:"Description of product 3", price:16.75, amount: 0};
    response =
        [
            p1, p2, p3
        ];
    return response
}