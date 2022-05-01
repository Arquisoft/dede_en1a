import { Button, Container, Grid, Input, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useUser } from "../context/UserContext"


export const AddProduct = () => {
	const {token} = useUser()
	const apiEndPoint = process.env.REACT_APP_API_URI 

	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [price, setPrice] = useState<number | string>('')

	const [file, setFile] = useState<File>()

	useEffect(() => {
		console.log(file)
	}, [file])


	const handleUpload = (e:any) => {
		setFile(e.target.files[0])
		} 
		
		const handleSubmit = async () => {
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
				if (file != undefined && file != null) {
					try {
						
					const fileData = new FormData()
					fileData.append("image", file)
					fileData.append("name", data._id)
					await axios.post(apiEndPoint + '/upload', fileData, { 
						headers: {
							auth: token
						}
					})
				} catch (error) {
					console.log(error)
				}
			}
		} catch (error : any) {
			console.log(error)
		}
	}
	return (
		<Container>
		<Grid container>
			<Grid item md={13}>
			<Typography variant="h2">
				Add product
			</Typography>
			</Grid>
			<Grid item md={13} paddingTop={"1em"}>
			<TextField 
				label='name' 
				placeholder='Enter name' 
				type='text' 
				fullWidth 
				required
				value={name} 
				onChange={e => setName(e.currentTarget.value)}
			/>
			</Grid>
			<Grid item md={13} paddingTop={"1em"}>
			<TextField 
				label='price' 
				placeholder='Enter price' 
				type='number' 
				fullWidth 
				required
				value={price} 
				onChange={e => setPrice(e.currentTarget.value)}
			/>
			</Grid>
			<Grid item md={13} paddingTop={"1em"}>
			<Button variant="contained" component="label">
				Upload image
				<Input 
					type="file" 
					id="input"
					hidden 
					onChange={handleUpload} 
				/>
			</Button>
			</Grid>
			<Grid item md={13} paddingTop={"1em"}>
			<TextField 
				multiline
				rows={5}
				label='description' 
				placeholder='Enter description' 
				type='text' 
				fullWidth 
				value={description} 
				onChange={e => setDescription(e.currentTarget.value)}
			/>
			</Grid>
			<Grid item md={13} paddingTop={"1em"}>
			<Button 
				type='submit' 
				color='primary' 
				variant="contained" 
				fullWidth 
				onClick={handleSubmit}
			>
				Add product
			</Button>
			</Grid>
		</Grid>
		</Container>
	)
}