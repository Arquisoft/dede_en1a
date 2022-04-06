import {Button} from "@mui/material";
import React from "react";
import {LoginButton} from "@inrupt/solid-ui-react"

export const LoginButtonSolid = () => {
    const oidcIssuer = "https://solidcommunity.net/"

    return (
        <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={(process.env.REACT_URI || "http://localhost:3000") + "/"}
        >
            <Button sx={{color: "white"}}>Log In</Button>
        </LoginButton>
    )
}