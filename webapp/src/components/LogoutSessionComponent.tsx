import {CircularProgress} from "@mui/material";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";


const LogoutSession = () => {
    const history = useHistory()

    useEffect(
        () => {
            localStorage.removeItem("webID")
            localStorage.removeItem("sessionID")
            localStorage.removeItem("name")
            localStorage.removeItem("address")
            history.push("/")
        },
        [history]
    )

    return (
        <CircularProgress/>
    )
}

export default LogoutSession