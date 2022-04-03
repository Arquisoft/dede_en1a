import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Badge} from '@mui/material';
import React from 'react'
import {useContext} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {getTotalItems} from '../helpers/calculate';
import {IconButton} from "@mui/material";
import LoginButton from "./login/LoginButtonComponent";
import LogoutButton from "./logout/LogoutButtonComponent";


type Props = {
    handleOpen: (state: boolean) => void;
}

const NavBar = ({handleOpen}: Props) => {
    const {cartItems} = useContext(CartContext);

    const toggleLoggedIn = () => {
        localStorage.getItem("loggedIn") == null ?
            localStorage.setItem("loggedIn", "true") :
            localStorage.removeItem("loggedIn")
    }
    //We have logged in, help
    return (
        <Navbar bg="dark" variant='dark' expand="lg">
                <Container /*style={{display: 'flex'}}*/>
                    <Link className='navbar-brand' to='/'>DEDE</Link>
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
                    {(localStorage.getItem("loggedIn") == null) ? <LoginButton setIsLoggedIn={toggleLoggedIn}/> : <LogoutButton setIsLoggedIn={toggleLoggedIn}/>}
                </Container>
        </Navbar>
    )
}

export default NavBar;