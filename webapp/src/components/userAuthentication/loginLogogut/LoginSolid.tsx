import {LoginButton} from "@inrupt/solid-ui-react";
import {Button} from "@mui/material";
import {validateUrl} from "../../../helpers/validateProviderUrl";

type Props = {
    provider: string
    redirectUrl: string
    setOpen: (open: boolean) => void
    isValid: boolean
}

export const LoginSolid = (props: Props) => {
    const {provider, redirectUrl, setOpen, isValid} = props

    const handleClick = () => {
        if(!validateUrl(provider))
            setOpen(true)
    }

    return (
        <LoginButton
            oidcIssuer={provider}
            redirectUrl={redirectUrl}>
            <Button sx={{color: "white"}} disabled={!isValid} onClick={handleClick}>Login</Button>
        </LoginButton>
    )
}