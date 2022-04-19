import {
    Grid,
    FormControl,
    InputLabel,
    Button,
    Paper,
    Box,
    Select,
    MenuItem,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {LoginSolid} from "./loginLogogut/LoginSolid";

export const SelectProviderComponent = () => {
    // Getting the parameters from the URL
    const queryParams = new URLSearchParams(window.location.search)
    const toLogIn = queryParams.get("toLogIn") == "1"

    const [textValue, setTextValue] = useState<string>("")
    const [redirectUrl, setRedirectUrl] = useState("")
    const providers = ["https://solidcommunity.net/", "https://broker.pod.inrupt.com"]

    useEffect(() => {
        setRedirectUrl("http://" + window.location.host)
    }, [])

    const handleSubmit = () => {
        if(textValue !== "")
            window.location.href = textValue
    }

    const handleChange = (event: SelectChangeEvent) => {
        setTextValue(event.target.value)
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"

            justifyContent="center"
            style={{ minHeight: '50vh'}}
        >
            <Box alignSelf={"center"} component="div" sx={{marginTop: '5%', maxWidth: '25%', whiteSpace: 'normal' }}>
                <Typography variant="h6">
                    In order to make purchases in this application a Solid Pod is needed. This Pod
                    will store your data and will belong entirely to you. DeDe, will only make use
                    of your Pod's to process your order. Your private data will not be saved.
                </Typography>
            </Box>

            <Paper elevation={3} style={{marginTop: '30px', marginLeft: '100px', marginRight: '100px', background: '#2E3B55'}}>
                <Typography variant="h2" style={{margin: '10px', color: 'white'}}>{toLogIn ? "Log into a pod provider" : "Pod registration"}</Typography>
                    <Box style={{margin: '10px',background: '#FFFFFF'}}>
                        <FormControl fullWidth>
                            <InputLabel id="select-provider-label">Select a Pod provider</InputLabel>
                            <Select
                                labelId="select-provider"
                                id="select-provider"
                                value={textValue}
                                label="Select a Pod provider"
                                onChange={handleChange}
                                style={{margin: '10px', borderColor: '#FFFFFF'}}
                            >
                                {providers.map((provider, index) =>
                                    <MenuItem key={index} value={provider}>{provider}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                <Box alignItems="center" >
                    {toLogIn ? <LoginSolid provider={textValue} redirectUrl={redirectUrl}/>
                        : <Button onClick={handleSubmit} style={{color: 'white'}}>Submit</Button>
                    }

                </Box>
            </Paper>
        </Grid>
   )
}