import {LoginButton} from "@inrupt/solid-ui-react";
import {Button} from "@mui/material";

type Props = {
    provider: string
    redirectUrl: string
}

export const LoginSolid = (props: Props) => {
    const {provider, redirectUrl} = props

    console.log(provider)
    console.log(redirectUrl)

    return (
        <LoginButton
            oidcIssuer={provider}
            redirectUrl={redirectUrl}>
            <Button sx={{color: "white"}}>Login</Button>
        </LoginButton>
    )
}