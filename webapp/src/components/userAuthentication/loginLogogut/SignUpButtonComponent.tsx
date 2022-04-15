import {Button} from "@mui/material";
import {useHistory} from "react-router-dom"



export const SignUpButtonComponent = () => {
    const history = useHistory()

    const selectProvider = () => {
        history.push(`/selectProvider?toLogIn=${0}`)
    }

    return (<Button sx={{color: "white"}} onClick={selectProvider}>SignUp</Button>)
}