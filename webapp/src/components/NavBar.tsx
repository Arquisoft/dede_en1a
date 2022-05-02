import React from 'react';
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
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
    Button, MenuItem, Menu,
    Grid
} from "@mui/material";
import logo from "../images/logoName.png";
import "./styles.css"
import {CartItem, NavBarProps} from "../shared/shareddtypes";
import {LogInSignUpComponent} from "./userAuthentication/LogInSignUpComponent"
import {useUser} from '../context/UserContext';


type NavBarItemProps = {
    isLoggedIn: boolean
}

type ShoppingCartProps = {
    handleOpen: (state: boolean) => void;
    cartItems: CartItem[]
}

/**
 * This function creates the buttons displayed in the navbar
 * @param props
 * @constructor
 */
function NavBarMenuItems(props: NavBarItemProps) {
    // This list contains the names of the options in the navBar
    const pages = ["Home", "My orders", "Add product", "Admin"]
    const history = useHistory()
    const {isLoggedIn} = props
    const {isLoggedInDeDe, role} = useUser();

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

    const navigateToAddProducts = () => {
        history.push('/dede/product/add')
    }

    const navigateToAdmin = () => {
        history.push('/admin/panel')
    }

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
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
                    display: {xs: 'block', md: 'none'},
                }}
            >
                <MenuItem key={pages[0]} onClick={navigateToHome}>
                    <Typography textAlign="center">{pages[0]}</Typography>
                </MenuItem>
                <MenuItem key={pages[1]} onClick={navigateToOrders} hidden={!isLoggedIn}>
                    <Typography textAlign="center">{pages[1]}</Typography>
                </MenuItem>
                <MenuItem key={pages[2]} onClick={navigateToAddProducts} hidden={!isLoggedInDeDe}>
                    <Typography textAlign="center">{pages[2]}</Typography>
                </MenuItem>
                <MenuItem key={pages[3]} onClick={navigateToAdmin}
                                     hidden={!isLoggedInDeDe && role != 'ADMIN'}>
                <Typography textAlign="center">{pages[3]}</Typography>
                </MenuItem>
                <MenuItem key="login">
                    <LogInSignUpComponent isLoggedIn={isLoggedIn}/> </MenuItem>
            </Menu>
        </Box>
    )
}

function ShoppingCart(props: ShoppingCartProps) {
    const {handleOpen, cartItems} = props

    return (
        <IconButton
            size="large"
            color="primary"
            onClick={() => handleOpen(true)}
            sx={{mr: 2, color: "white"}}
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
function NavBarButtons(props: NavBarItemProps) {
    // This list contains the names of the options in the navBar
    const {isLoggedInDeDe, role} = useUser();
    const pages = ["Home", "My orders", "Add product", "Admin"]
    const history = useHistory()

    // Props
    const {isLoggedIn} = props

    const navigateToHome = () => {
        history.push("/")
    }

    const navigateToOrders = () => {
        history.push("/orders/list")
    }

    const navigateToAddProducts = () => {
        history.push('/dede/product/add')
    }

    const navigateToAdmin = () => {
        history.push('/admin/panel')
    }

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <Button
                key={pages[0]}
                onClick={navigateToHome}
                sx={{mr: 2, color: 'white'}}
            >
                {pages[0]}
            </Button>
            <Button
                key={pages[1]}
                onClick={navigateToOrders}
                sx={{mr: 2, color: 'white'}}
                hidden={!isLoggedIn}
            >
                {pages[1]}
            </Button>
            {isLoggedInDeDe ?
                <Button
                    key={pages[2]}
                    onClick={navigateToAddProducts}
                    sx={{mr: 2, color: 'white'}}
                >
                    {pages[2]}
                </Button>
                :
                <></>
            }
            {isLoggedInDeDe && role === "ADMIN" ?
                <Button
                    key={pages[3]}
                    onClick={navigateToAdmin}
                    sx={{mr: 2, color: 'white'}}
                >
                    {pages[3]}
                </Button>
                :
                <></>
            }
        </Box>
    )
}

const NavBar = (props: NavBarProps) => {
    const {isLoggedIn, handleOpen} = props;
    const {cartItems} = useContext(CartContext);
    const history = useHistory()

    return (
        <AppBar position="static" style={{background: '#2E3B55', width: "auto", minWidth: "5%"}}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        <img src={logo} style={{height:"50px", width:"200px"}} onClick={() => history.push("/")} alt="dededeals"/>
                    </Typography>
                    <NavBarMenuItems isLoggedIn={isLoggedIn}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        <img src={logo} style={{height:"50px", width:"200px"}} onClick={() => history.push("/")} alt="dededeals"/>
                    </Typography>
                    <NavBarButtons isLoggedIn={isLoggedIn}/>
                    <Grid container justifyContent="flex-end">
                        <ShoppingCart handleOpen={handleOpen} cartItems={cartItems}/>
                        <LogInSignUpComponent isLoggedIn={isLoggedIn}/>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;