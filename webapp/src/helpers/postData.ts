import {OrderAdd} from "../shared/shareddtypes";

const postData = async (order: OrderAdd) => {
    console.log(order);
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";

    let response = await fetch(apiEndPoint + '/order/add', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(
            {
                webId: order.webId,
                shippingPrice: order.shippingPrice,
                totalPrice: order.totalPrice,
                name: order.name,
                address: order.address,
                products: order.products.map(prod => {
                    return {
                        prod: prod._id,
                        amount: prod.amount
                    }
                })
            }
        )
    });
    return response;
}

export default postData;
