import {OrderAdd} from "../shared/shareddtypes";

const postData = async (order: OrderAdd) => {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";

    const fetchApi = await fetch(apiEndPoint+'/order/add',{
        method: 'POST',
        body: JSON.stringify(order),
        headers:{
            'Content-type': 'application/json'
        }
    })

    return fetchApi;
}

export default postData;