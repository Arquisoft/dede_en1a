import React, {useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import {Order, Product} from "../../shared/shareddtypes";
import {
    Alert,
    Autocomplete,
    Box,
    Button, Input,
    Stack, TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import axios from 'axios';
import {deleteOrder, deleteProduct, getOrders} from "../../api/api";
import {useUser} from "../../context/UserContext";

const AdminPanel = () => {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    const {token} = useUser();
    const {products} = useFetch();
    const [orders, setOrders] = useState<Order[]>([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<File>();
    const [error, setError] = useState<string>('')

    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [selectedOrder, setSelectedOrder] = useState<Order>();

    const fetchOrders = async () => {
        setOrders(await getOrders());
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const delProduct = (product: Product) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(product._id).then((res) => {
                console.log(res)
                if(res){
                    window.location.reload();
                }
                else
                    alert("Failed to delete product");
            });
        }
    }

    const delOrder = (order: Order) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            deleteOrder(order._id).then((res) => {
                console.log(res)
                if(res){
                    window.location.reload();
                }
                else
                    alert("Failed to delete order");
            });
        }
    }

    const handleUpload = (e:any) => {
        setImage(e.target.files[0])
        if (image != undefined && image && null) {
            if (image.name.split('.').pop() != 'jpg') {
                setError('Only jpg files are supported')
            } else {
                setError('')
            }
        }
    }

    const addProduct = async() => {
        if (image == undefined) {
            setError('image is required')
            return
        }
        try {
            let {data} = await axios.post(apiEndPoint + '/product/add', {
                name: name,
                price: price,
                description: description
            },{
                headers: {
                    auth: token
                }
            })
            const imageData = new FormData()
            imageData.append("image", image)
            imageData.append("name", data._id)

            await axios.post(apiEndPoint + '/upload', imageData, {
                headers: {
                    auth: token
                }
            })
            window.location.reload();
        } catch (error : any) {
            if (error.response.status == 401) {
                setError('you need to be logged in with a dede account')
            }
            console.log(error)
        }
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
                            required
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
                            required
                            placeholder="Description of the product"
                            style={{width: "100%"}}
                            value={description}
                            onChange={(e: any) => setDescription(e.target.value)}
                        />
                        <br/>
                        <TextField
                            label="Price (€)"
                            variant="outlined"
                            type="number"
                            required
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
                            <Input
                                type="file"
                                id="input"
                                hidden
                                onChange={handleUpload}
                            />
                        </Button>
                        <br/>
                        <Alert severity="error" hidden={error == ''}>{error}</Alert>

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
                            onClick={() => delProduct(selectedProduct as Product)}>
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
                            onClick={() => delOrder(selectedOrder as Order)}>
                        Delete Order
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default AdminPanel;