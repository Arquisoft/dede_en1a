import React from "react";
import { Button } from "@mui/material"
import { useHistory } from "react-router-dom"

export const DeDeLoginButtonProvider = () => {
    const history = useHistory()

    const deDeLogin = () => {

        history.push(`/dede/login`)
    }

    return (<Button sx={{color: "white"}} onClick={deDeLogin}>Login as seller</Button>)
}