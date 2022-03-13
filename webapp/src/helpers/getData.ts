const getProducts = async () => {
    const apiEndPoint = process.env.REACT_APP_ARI_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint + "/products/list");
    return response.json();
}

export default getProducts;