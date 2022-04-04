import {OrderAdd, Product} from "../shared/shareddtypes";

const postData = async (order: OrderAdd) => {
    console.log(order);
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";

    let response = await fetch(apiEndPoint + '/order/add', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(
            {
                'webId': order.webId,
                'shipping': order.shippingPrice,
                totalPrice: order.totalPrice,
                name: order.name,
                address: order.address,
                items: order.products
            }
        )
    });
    return response;
}

export default postData;
