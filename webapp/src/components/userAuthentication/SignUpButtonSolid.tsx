import {Button} from "@mui/material";
import {useHistory} from "react-router-dom"



export const SignUpButtonSolid = () => {
    const history = useHistory()

    const selectProvider = () => {
        history.push("/signup/selectProvider")
    }

    return (<Button sx={{color: "white"}} onClick={selectProvider}>SignUp</Button>)
}