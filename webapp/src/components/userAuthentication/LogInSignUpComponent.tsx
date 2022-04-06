import {Box} from "@mui/material";
import React from "react";
import {LoginButtonSolid} from "./loginLogogut/LoginButtonComponent";
//import {LogoutButtonSolid} from "./loginLogogut/LogoutButtonComponent";
import {SignUpButtonSolid} from "./SignUpButtonSolid";
import {LogoutButtonSolid} from "./loginLogogut/LogoutButtonComponent";

type Props = {
    isLoggedIn: boolean
}

export const LogInSignUpComponent = (props: Props) => {
    const {isLoggedIn} = props

    return (
        <Box>
            <Box hidden={isLoggedIn} sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <LoginButtonSolid/>
                <SignUpButtonSolid/>
            </Box>
            <Box hidden={!isLoggedIn}>
                <LogoutButtonSolid/>
            </Box>
        </Box>
    )
}