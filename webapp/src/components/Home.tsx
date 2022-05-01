import React from 'react';
import {Container} from 'react-bootstrap';
import ListProducts from '../components/listProducts/ListProducts'
import {Footer} from "./footer/Footer";

export const Home = () => {
    return (
        <><Container className='mt-3 home'>
            <ListProducts/>
        </Container><Footer/></>
    )
}