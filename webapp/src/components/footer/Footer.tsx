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
                style={{marginTop:"50px", minHeight:"10%", width:"100%", backgroundColor:"#212529", color:"white", position:"relative", marginBottom:"0px"}}
            >
                <Typography variant="h6" align="center">If you have any suggestions or questions please contact us: dededeals@hotmail.com</Typography>
            </Box>
        </>
    );
}