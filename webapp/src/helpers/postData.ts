import {Order} from "../shared/shareddtypes";

const postData = async (order: Order) => {

    const fetchApi = await fetch('http://localhost:5000/order/add',{
        method: 'POST',
        body: JSON.stringify(order),
        headers:{
            'Content-type': 'application/json'
        }
    })

    return fetchApi;
}

export default postData;