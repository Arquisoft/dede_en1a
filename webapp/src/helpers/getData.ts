const getProducts = async () => {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + "/product/list");
    return response.json();
}

export default getProducts;