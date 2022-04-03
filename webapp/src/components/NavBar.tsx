import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Badge} from '@mui/material';
import React, {useEffect, useState} from 'react'
import {useContext} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {getTotalItems} from '../helpers/calculate';
import {IconButton} from "@mui/material";
import LoginButtonSolid from "./login/LoginButtonComponent";
import {LogoutButtonSolid} from "./logout/LogoutButtonComponent";
import logo from "../images/logoName.png";
import {useSession} from "@inrupt/solid-ui-react";
import { NavLink } from 'react-router-dom';

type Props = {
    handleOpen: (state: boolean) => void;
}

const NavBar = ({handleOpen}: Props) => {
    const {cartItems} = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {session} = useSession()



    useEffect(() => {
        if(isLoggedIn && session.info.webId)
            localStorage.setItem("webId", session.info.webId)
        else
            localStorage.removeItem("webId")
    }, [isLoggedIn, session.info.webId])

    session.onLogin(() => {
        setIsLoggedIn(true)
    })

    session.onLogout(() => {
        setIsLoggedIn(false)
    })

    //We have logged in, help
    return (
        <Navbar bg="dark" variant='dark' expand="lg">
                <Container /*style={{display: 'flex'}}*/>
                    <Link to="/"><img src={logo} style={{height:"50px", width:"200px"}}/></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className='nav-link' to="/">Home</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <IconButton
                        size="large"
                        color="primary"
                        onClick={ () => handleOpen(true)}
                        sx={{ mr: 2 }}
                        id="shoppingCart"
                    >
                        <Badge badgeContent={getTotalItems(cartItems)} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    {!isLoggedIn ? <LoginButtonSolid/> : <LogoutButtonSolid/>}
                </Container>
        </Navbar>
    )
}

export default NavBar;