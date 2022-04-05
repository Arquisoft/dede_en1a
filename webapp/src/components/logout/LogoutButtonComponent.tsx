import {Button} from "@mui/material";
import React from "react";
import {LogoutButton} from "@inrupt/solid-ui-react";
import {useHistory} from "react-router-dom"

export const LogoutButtonSolid = () => {
    const history = useHistory()

    return(
        <LogoutButton onLogout={() => {history.push("/")}}>
            <Button sx={{color: "white"}}>Logout</Button>
        </LogoutButton>
    )
}
