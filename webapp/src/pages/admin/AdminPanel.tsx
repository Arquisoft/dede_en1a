import React, { Component } from "react";
import useFetch from "../../hooks/useFetch";
import {Product} from "../../shared/shareddtypes";
import Grid from "@mui/material/Grid";
type Props = {};

type State = {
    content: string;
}

const Products = () => {
    const {products, isLoading} = useFetch();

    const renderCards = products.map((product: Product) => {
        return (
            <Grid key={product._id} item container xs={12} sm={6} md={4} lg={3}>

            </Grid>
        )
    })

}

export default class AdminPanel extends Component<Props, State> {


    
    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}