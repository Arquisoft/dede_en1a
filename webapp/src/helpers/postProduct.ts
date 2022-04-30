import {Product} from "../shared/shareddtypes";

function imgToBase64(img:any): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(img);
    });
}

const postProduct = async (product: Product, image: FileList) => {
    var base64Images: (string|any)[] = [];
    for(var i = 0; i < image.length; i++)
    {
        base64Images.push(await imgToBase64(image[i]));
    }
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    console.log(product);
    let response = await fetch(apiEndPoint + '/product/add', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(
            {
                name: product.name,
                price: product.price,
                description: product.description,
                image: base64Images
            }
        )
    });

    return response;
}

export default postProduct;