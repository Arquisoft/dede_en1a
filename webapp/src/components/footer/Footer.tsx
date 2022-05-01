import {Box, Typography} from "@mui/material";

export const Footer = (): JSX.Element => {

    return (
        <>
            <Box
                id="footer"
                sx={{
                    height:60
                }}
                style={{marginTop:"5%", minHeight:"10%", backgroundColor:"#212529", color:"white"}}
            >
                <Typography variant="h6" align="center">If you have any suggestion or question contact us: dededeals@hotmail.com</Typography>
            </Box>
        </>
    );
}