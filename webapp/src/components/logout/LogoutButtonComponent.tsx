import {Button} from "@mui/material";
import React from "react";

type Props = {
    setIsLoggedIn: () => void
}

const LogoutButton = (props: Props) => {
    const {setIsLoggedIn} = props
    return(
        <Button onClick={() => {
            setIsLoggedIn()
            window.location.href="http://localhost:5000/solid/logout/" + localStorage.getItem("sessionID")
        }}>
            Logout
        </Button>
    )
}

export default LogoutButton