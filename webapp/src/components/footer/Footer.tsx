import {Box, Typography} from "@mui/material";
import React from "react";


export const Footer = (): JSX.Element => {

    return (
        <>
            <Box
                id="footer"
                sx={{
                    height:60
                }}
                style={{marginTop:"5%", minHeight:"10%", width:"100%", backgroundColor:"#212529", color:"white", position:"absolute", bottom:"0"}}
            >
                <Typography variant="h6" align="center">If you have any suggestion or question contact us: dededeals@hotmail.com</Typography>
            </Box>
        </>
    );
}