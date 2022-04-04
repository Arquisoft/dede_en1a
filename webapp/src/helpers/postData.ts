import {OrderAdd, Product} from "../shared/shareddtypes";

const postData = async (order: OrderAdd) => {
    console.log(order);
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";

    let response = await fetch(apiEndPoint + '/order/add', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(
            {
                webId: order.webId,
                address: order.address,
                name: order.name,
                totalPrice: order.totalPrice,
                shippingPrice: order.shippingPrice,
                products : order.products.map(x => {
					return {
						product: x._id, number: x.amount
					}
				})
			})
    });
    return response;
}

export default postData;
