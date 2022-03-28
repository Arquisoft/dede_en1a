const getProducts = async () => {
    const apiEndPoint = "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/product/list");
    return response.json();
}

export default getProducts;