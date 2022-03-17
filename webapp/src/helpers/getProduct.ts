const getProduct = async (_id: string) => {
    const apiEndPoint = process.env.REACT_APP_ARI_URI || "http://localhost:5000";
    let response = await fetch(apiEndPoint + `/product/details/${_id}`);
    return response.json();
}

export default getProduct;