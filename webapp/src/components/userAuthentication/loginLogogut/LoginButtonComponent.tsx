import {Button} from "@mui/material";
import React from "react";
import {useHistory} from "react-router-dom";

export const LoginButtonProvider = () => {
    const history = useHistory()

    const selectProvider = () => {
        localStorage.removeItem("fn")
        localStorage.removeItem("address")
        history.push(`/selectProvider?toLogIn=${1}`)
    }

    return (<Button sx={{color: "white"}} onClick={selectProvider}>Login</Button>)
}