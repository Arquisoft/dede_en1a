import {Product} from '../shared/shareddtypes';

export async function getProducts():Promise<Product[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:3000/api'
    let response = await fetch(apiEndPoint+'/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}