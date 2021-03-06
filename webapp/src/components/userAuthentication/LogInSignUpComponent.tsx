import {Box} from "@mui/material";
import React from "react";
import {LoginButtonProvider} from "./loginLogogut/LoginButtonComponent";
import {SignUpButtonComponent} from "./loginLogogut/SignUpButtonComponent";
import {LogoutButtonSolid} from "./loginLogogut/LogoutButtonComponent";
import { DeDeLoginButtonProvider } from "./loginLogogut/DeDeLoginButtonProvider";

type Props = {
    isLoggedIn: boolean
}

export const LogInSignUpComponent = (props: Props) => {
    const {isLoggedIn} = props

    return (
        <Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
				{!isLoggedIn ?
				<>
					<LoginButtonProvider/>
					<SignUpButtonComponent/>
				</>
				:
				<>
					<DeDeLoginButtonProvider/>
                	<LogoutButtonSolid/>
				</>
				}
            </Box>
        </Box>
    )
}