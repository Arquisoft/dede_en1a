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
// "webId" : "not a webId",
// "address": "not an address",
// "name" : "not a name",
// "shippingPrice": 23,
// "totalPrice": 23,
// "products" : [
// 	{"product" : "622fc1848aedec1b7f53677e", "number" : 2 },
// 	{"product" : "6249cefb7fae0f9288454c36", "number" : 2 },
// 	{"product" : "624b073c7f33d230eb264525", "number" : 2 }
// ]

export default postData;
