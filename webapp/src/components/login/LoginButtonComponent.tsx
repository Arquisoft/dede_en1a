import {Button} from "@mui/material";
import React from "react";
import {LoginButton} from "@inrupt/solid-ui-react"

const LoginButtonSolid = () => {
    const oidcIssuer = "https://solidcommunity.net/"

    return (
        <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={(process.env.SOLID_REDIRECT_URI || "http://localhost:3000") + "/"}
        >
            <Button color="primary">Log In</Button>
        </LoginButton>
    )
}

export default LoginButtonSolid