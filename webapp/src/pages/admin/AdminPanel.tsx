import React, {useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import {Order, Product} from "../../shared/shareddtypes";
import {
    Autocomplete,
    Box,
    Button, 
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {getOrders} from "../../api/api";
import axios from "axios";
import {useUser} from "../../context/UserContext";


const AdminPanel = () => {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    const {token} = useUser()
    const {products} = useFetch();
    const [orders, setOrders] = useState<Order[]>([]);
	const [users, setUsers] = useState<string[]>([])

    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [selectedOrder, setSelectedOrder] = useState<Order>();
	const [selectedUser, setSelectedUser] = useState<string>();
	const [selectedUserDelete, setSelectedUserDelete] = useState<string>();

    const fetchOrders = async () => {
        setOrders(await getOrders());
    }

	const fetchUsers = async () => {
		let {data} = await axios.get(apiEndPoint + '/user/list', {headers: {auth: token}})
		setUsers(data.map((x:any) => x.webId))
	}

    useEffect(() => {
        fetchOrders();
		fetchUsers();
    }, []);

    const deleteProduct = async (product: Product) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await axios.get(apiEndPoint + '/product/delete/' + product._id,
                {headers: {auth: token}})
            useFetch();
        }
    }

    const deleteOrder = async (order: Order) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            await axios.get(apiEndPoint + '/order/delete/' + order._id,
                {headers: {auth: token}});
            fetchOrders();
        }
    }

	const promote = async () => {
        if (window.confirm("If you continue the selected user will become an admin")) {
            await axios.get(apiEndPoint + '/user/promote/' + selectedUser, {headers: {auth: token}})
        }
	}

	const deleteUser = async () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await axios.get(apiEndPoint + '/user/delete/' + selectedUserDelete, {headers: {auth: token}})
            fetchUsers();
        }
	}

    return (
        <div>
            <Typography variant="h2" align="center">Admin panel</Typography>
            <Box style={{display: 'flex'}}>
                <Stack m={6} spacing={5} style={{flex: 3, alignItems: "center"}}>
        
                    <Typography variant="h5">Delete a product:</Typography>
					<div style={{
						display: "flex",
						flexDirection: "row",
						
					}}>

                    <Autocomplete
                        disablePortal
                        id="productComboBox"
                        options={products.map((option) => option.name + " [" + option._id + "]")}
                        renderInput={(params) =>
                            <TextField {...params} label="Select the product to delete"
							variant="outlined"/>}
							contentEditable={false}
							sx={{width: "30em", paddingRight: ".5em"}}
                        onChange={(event, value) => {
							setSelectedProduct(products.filter(product => product.name + " [" + product._id + "]" === value)[0]);
                        }}
						/>
                    <Button variant="contained" color="primary"
                            onClick={() => deleteProduct(selectedProduct as Product)}>
                        Delete Product
                    </Button>
					</div>
					<Typography variant="h5">Delete an order:</Typography>
					<div style={{
						display: "flex",
						flexDirection: "row",
						
					}}>
                    <Autocomplete
                        disablePortal
                        id="orderComboBox"
                        options={orders.map((option) => option._id + ", address: " + option.address + ", date: " + option.createdAt)}
                        renderInput={(params) =>
                            <TextField {...params} label="Select order to delete"
							variant="outlined"/>}
							contentEditable={false}
							sx={{width: "30em", paddingRight:".5em"}}
							onChange={(event, value) => {
								setSelectedOrder(orders.filter(order => order._id + ", address: " + order.address + ", date: " + order.createdAt === value)[0]);
							}}
							/>
                    <Button variant="contained" color="primary"
                            onClick={() => deleteOrder(selectedOrder as Order)}>
                        Delete Order
                    </Button>
					</div>

					<Typography variant="h5">Promote to admin:</Typography>
					<div style={{
						display: "flex",
						flexDirection: "row",
						
					}}>

						<Autocomplete
							disablePortal
							id="orderComboBox"
							options={users}
							renderInput={(params) =>
								<TextField {...params} label="Select user to promote"
								variant="outlined"/>}
								contentEditable={false}
								sx={{width: "30em", paddingRight: ".5em"}}
								onChange={(event, value) => {
									setSelectedUser(users.filter(x => x == value)[0])
								}}
								/>
						<Button variant="contained" color="primary"
								onClick={promote}
								>
							Promote user
						</Button>
					</div>
					<Typography variant="h5">Delete user:</Typography>
					<div style={{
						display: "flex",
						flexDirection: "row",
						
					}}>

						<Autocomplete
							disablePortal
							id="orderComboBox"
							options={users}
							renderInput={(params) =>
								<TextField {...params} 
									label="Select user to delete"
									variant="outlined"/>}
									contentEditable={false}
									sx={{width: "30em", paddingRight: ".5em"}}
									onChange={(event, value) => {
										setSelectedUserDelete(users.filter(x => x == value)[0])
									}}
						/>
						<Button 
							variant="contained" 
							color="primary"
							onClick={deleteUser}
						>
							delete user
						</Button>
					</div>
                </Stack>
            </Box>
        </div>
    );
}

export default AdminPanel;