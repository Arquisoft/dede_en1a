const getProducts = async () => {
    const apiEndPoint = process.env.REACT_APP_API_URI;
    // console.log(apiEndPoint);
    let response = await fetch(apiEndPoint + "/product/list");
    // console.log(response);
    return response.json();
}

export default getProducts;