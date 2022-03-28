import {CircularProgress} from "@mui/material";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";


const LogoutSession = () => {
    const history = useHistory()

    useEffect(
        () => {
            localStorage.removeItem("webID")
            localStorage.removeItem("sessionID")
            localStorage.removeItem("address")
            localStorage.removeItem("fn")
            history.push("/")
        },
        [history]
    )

    return (
        <CircularProgress/>
    )
}

export default LogoutSession