import {Button} from "@mui/material";
import React from "react";

type Props = {
    setIsLoggedIn: () => void
}

const LoginButton = (props: Props) => {
    const {setIsLoggedIn} = props
    return (
        <Button onClick={() => {
            setIsLoggedIn()
            window.location.href="http://localhost:5000/solid/login"
        }}>
            Login
        </Button>
    )
}

export default LoginButton