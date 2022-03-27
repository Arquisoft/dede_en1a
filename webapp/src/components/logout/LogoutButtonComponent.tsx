import {Button} from "@mui/material";
import React from "react";

type Props = {
    setIsLoggedIn: () => void
}



const LogoutButton = (props: Props) => {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000";
    const {setIsLoggedIn} = props
    return(
        <Button onClick={() => {
            setIsLoggedIn()
            window.location.href=apiEndPoint+"/solid/logout/" + localStorage.getItem("sessionID")
        }}>
            Logout
        </Button>
    )
}

export default LogoutButton