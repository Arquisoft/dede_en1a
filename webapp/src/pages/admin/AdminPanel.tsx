import React, {useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import {Order, Product} from "../../shared/shareddtypes";
import {
    Autocomplete,
    Box,
    Button,
    Stack, TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import Axios from "axios";
import postProduct from "../../helpers/postProduct";
import {getOrders} from "../../api/api";
import {Label} from "@mui/icons-material";


const AdminPanel = () => {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    const {products} = useFetch();
    const [orders, setOrders] = useState<Order[]>([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImages] = useState<FileList>();

    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [selectedOrder, setSelectedOrder] = useState<Order>();

    const fetchOrders = async () => {
        setOrders(await getOrders());
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const deleteProduct = (product: Product) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            Axios.post(apiEndPoint + '/product/delete/' + product._id);
        }
    }

    const deleteOrder = (order: Order) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            Axios.post(apiEndPoint + '/order/delete/' + order._id);
        }
    }

    function addProduct() {
        postProduct({name: name, description, price} as Product, image as FileList).then((res) => {
            if (res.ok) {
                window.location.reload();
            } else
                alert("Error adding product");
        });
    }

    return (
        <div>
            <Typography variant="h2" align="center">Admin panel</Typography>
            <Box style={{display: 'flex'}}>
                <Stack m={6} spacing={5} style={{flex: 3, alignItems: "center"}}>
                    <Typography variant="h5">Add Product:</Typography>
                    <form id="addProductForm" style={{display: "grid", marginTop: "15px", minWidth: "40%"}}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            type="text"
                            id="product-name"
                            placeholder="Name of the product"
                            style={{width: "100%"}}
                            sx={{input: {color: 'black'}}}
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                        <br/>
                        <label htmlFor="product-description">Description:</label>
                        <TextareaAutosize
                            id="product-description"
                            placeholder="Description of the product"
                            style={{width: "100%"}}
                            value={description}
                            onChange={(e: any) => setDescription(e.target.value)}
                        />
                        <br/>
                        <TextField
                            label="Price (€)"
                            variant="outlined"
                            type="text"
                            id="product-price"
                            placeholder="Price of the product"
                            style={{width: "100%"}}
                            sx={{input: {color: 'black'}}}
                            value={price}
                            onChange={(e: any) => setPrice(parseFloat(e.target.value))}
                        />
                        <br/>
                        <Button variant="contained" component="label">
                            Upload image
                            <input type="file" hidden multiple
                                   onChange={(event) => setImages(event.target.files as FileList)}/>
                        </Button>
                        <br/>
                        <Button variant="contained" color="primary" onClick={addProduct}>
                            Add product
                        </Button>
                    </form>

                    <Typography variant="h5">Delete a product:</Typography>
                    <Autocomplete
                        disablePortal
                        id="productComboBox"
                        options={products.map((option) => option.name + " [" + option._id + "]")}
                        renderInput={(params) =>
                            <TextField {...params} label="Select the product to delete"
                                       variant="outlined"/>}
                        contentEditable={false}
                        sx={{width: "600px"}}
                        onChange={(event, value) => {
                            setSelectedProduct(products.filter(product => product.name + " [" + product._id + "]" === value)[0]);
                        }}
                    />
                    <Button variant="contained" color="primary"
                            onClick={() => deleteProduct(selectedProduct as Product)}>
                        Delete Product
                    </Button>

                    <Typography variant="h5">Delete an order:</Typography>
                    <Autocomplete
                        disablePortal
                        id="orderComboBox"
                        options={orders.map((option) => option._id + ", address: " + option.address + ", date: " + option.createdAt)}
                        renderInput={(params) =>
                            <TextField {...params} label="Select order to delete"
                                       variant="outlined"/>}
                        contentEditable={false}
                        sx={{width: "600px"}}
                        onChange={(event, value) => {
                            setSelectedOrder(orders.filter(order => order._id + ", address: " + order.address + ", date: " + order.createdAt === value)[0]);
                        }}
                    />
                    <Button variant="contained" color="primary"
                            onClick={() => deleteOrder(selectedOrder as Order)}>
                        Delete Order
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default AdminPanel;