import {Box} from "@mui/material";
import React from "react";
import {LoginButtonProvider} from "./loginLogogut/LoginButtonComponent";
import {SignUpButtonComponent} from "./loginLogogut/SignUpButtonComponent";
import {LogoutButtonSolid} from "./loginLogogut/LogoutButtonComponent";

type Props = {
    isLoggedIn: boolean
}

export const LogInSignUpComponent = (props: Props) => {
    const {isLoggedIn} = props

    return (
        <Box>
            <Box hidden={isLoggedIn} sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <LoginButtonProvider/>
                <SignUpButtonComponent/>
            </Box>
            <Box hidden={!isLoggedIn}>
                <LogoutButtonSolid/>
            </Box>
        </Box>
    )
}