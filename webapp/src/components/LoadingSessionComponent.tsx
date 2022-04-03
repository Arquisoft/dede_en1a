import {useParams} from "react-router";
import {CircularProgress} from "@mui/material";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";


type URLParams = {
    webID: string,
    sessionId: string
}

const LoadingSession = () => {
    const {webID, sessionId} = useParams<URLParams>()
    const history = useHistory()
    useEffect(
        () => {
            localStorage.setItem("webID", webID)
            localStorage.setItem("sessionID", sessionId)
            history.push("/")
        },
        [history, webID, sessionId]
    )

    return (
        <CircularProgress/>
    )
}

export default LoadingSession