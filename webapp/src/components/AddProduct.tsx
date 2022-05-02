import React from 'react';
import {Alert, Button, Container, Grid, TextareaAutosize, TextField, Typography} from "@mui/material"
import axios from "axios"
import {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {useUser} from "../context/UserContext"
import {Footer} from "./footer/Footer";


export const AddProduct = () => {
    const {token} = useUser()
    const apiEndPoint = process.env.REACT_APP_API_URI
    const history = useHistory()
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<number | string>('')
    const [error, setError] = useState<string>('')
	const [imageUrl, setImageUrl] = useState<string>('')

	const [valid, setValid] = useState<boolean>(false)

	useEffect(() => {
		if (!name || name === '') 
			return;
		if (!price) 
			return;
		if (!imageUrl || imageUrl == '')
			return
		setValid(true)
	}, [name, price, imageUrl])


    const handleSubmit = async () => {
        try {
            await axios.post(apiEndPoint + '/product/add', {
                name: name,
                price: price,
                description: description,
				image: imageUrl
            }, {headers: {auth: token}})

            history.push('/')
        } catch (error: any) {
            if (error.response && error.response.status == 401) {
                setError('you need to be logged in with a dede account')
            }
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
                    <TextField
                        label='image url'
                        placeholder='Enter url of image'
                        type='url'
                        fullWidth
                        required
                        value={imageUrl}
                        onChange={e => setImageUrl(e.currentTarget.value)}
                    />
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <TextareaAutosize
                        id="product-description"
                        placeholder="Description of the product"
                        style={{width: "100%"}}
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <Alert severity="error" hidden={error == ''}>{error}</Alert>
                </Grid>
                <Grid item md={13} paddingTop={"1em"}>
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
						disabled={!valid}
                    >
                        Add product
                    </Button>
                </Grid>
            </Grid>
            <Footer/>
        </Container>
    )
}