import React from 'react'
import {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {getTotalItems} from '../helpers/calculate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import {
    IconButton,
    AppBar,
    Badge,
    Container,
    Toolbar,
    Typography,
    Box,
    Button,
    Menu, MenuItem
} from "@mui/material";
import LoginButtonSolid from "./login/LoginButtonComponent";
import {LogoutButtonSolid} from "./logout/LogoutButtonComponent";
import logo from "../images/logoName.png";
import "./styles.css"
import {CartItem, NavBarProps} from "../shared/shareddtypes";

type NavBarItemProps = {
    isLoggedIn: boolean
}

type ShoppingCartProps = {
    handleOpen: (state: boolean) => void;
    cartItems: CartItem[]
}

function ShoppingCart(props: ShoppingCartProps) {
    const {handleOpen, cartItems} = props

    return(
        <IconButton
            size="large"
            color="primary"
            onClick={ () => handleOpen(true)}
            sx={{ mr: 2 }}
            id="shoppingCart"
        >
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <ShoppingCartIcon/>
            </Badge>
        </IconButton>
    )
}

/**
 * This function creates the buttons displayed in the navbar
 * @param props
 * @constructor
 */
function NavBarMenuItems(props: NavBarItemProps) {
    // This list contains the names of the options in the navBar
    const pages = ["Home", "My orders"]
    const history = useHistory()
    const {isLoggedIn} = props

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigateToHome = () => {
        history.push("/")
    }

    const navigateToOrders = () => {
        history.push("/orders/list")
    }

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                <MenuItem key={pages[0]} onClick={navigateToHome}>
                    <Typography textAlign="center">{pages[0]}</Typography>
                </MenuItem>
                <MenuItem key={pages[1]} onClick={navigateToOrders} hidden={!isLoggedIn}>
                    <Typography textAlign="center">{pages[1]}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

/**
 * This function creates the buttons displayed in the navbar
 * @param props
 * @constructor
 */
function NavBarButtons(props: NavBarItemProps) {
    // This list contains the names of the options in the navBar
    const pages = ["Home", "My orders"]
    const history = useHistory()

    // Props
    const {isLoggedIn} = props

    const navigateToHome = () => {
        history.push("/")
    }

    const navigateToOrders = () => {
        history.push("/orders/list")
    }

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                key={pages[0]}
                onClick={navigateToHome}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {pages[0]}
            </Button>
            <Button
                key={pages[1]}
                onClick={navigateToOrders}
                sx={{ my: 2, color: 'white', display: 'block' }}
                hidden={!isLoggedIn}
            >
                {pages[1]}
            </Button>
        </Box>

    )
}

const NavBar = (props: NavBarProps) => {
    const {isLoggedIn, handleOpen} = props
    const {cartItems} = useContext(CartContext);



    return (
    <AppBar position="static" style={{background: '#2E3B55'}}>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    <img src={logo} style={{height:"50px", width:"200px"}}/>
                </Typography>
                <NavBarMenuItems isLoggedIn={isLoggedIn}/>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                    <img src={logo} style={{height:"50px", width:"200px"}}/>
                </Typography>
                <NavBarButtons  isLoggedIn={isLoggedIn}/>
                <ShoppingCart handleOpen={handleOpen} cartItems={cartItems}/>
                {!isLoggedIn ? <LoginButtonSolid/> : <LogoutButtonSolid/>}
            </Toolbar>
        </Container>
    </AppBar>
    )
}

export default NavBar;