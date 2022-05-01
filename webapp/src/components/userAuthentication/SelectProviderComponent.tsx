import {
    Grid,
    FormControl,
    Button,
    Paper,
    Box,
    Typography, TextField, Alert, Collapse, IconButton
} from "@mui/material";
import {useEffect, useState} from "react";
import {LoginSolid} from "./loginLogogut/LoginSolid";
import {validateUrl} from "../../helpers/validateProviderUrl";
import CloseIcon from '@mui/icons-material/Close';

export const SelectProviderComponent = () => {
    // Getting the parameters from the URL
    const queryParams = new URLSearchParams(window.location.search)
    const toLogIn = queryParams.get("toLogIn") == "1"
    const [isValid, setIsValid] = useState(false)
    const [textValue, setTextValue] = useState<string>("")
    const [redirectUrl, setRedirectUrl] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setRedirectUrl("http://" + window.location.host)
    }, [])

    useEffect(() => {
        setIsValid(validateUrl(textValue))
    }, [textValue])

    const handleSubmit = () => {
        if(validateUrl(textValue))
            window.location.href = textValue
        else
            setOpen(true)
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '50vh'}}
        >
            <Box alignSelf={"center"} component="div" sx={{marginTop: '5%', maxWidth: '50%', whiteSpace: 'normal' }}>
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
                            <TextField
                                id="provider-textfield"
                                label="Select a provider"
                                variant="outlined"
                                onChange={e => setTextValue(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                <Box alignItems="center" >
                    {toLogIn ?
                        <Box>
                            <Collapse in={open}>
                                <Alert
                                    severity={"info"}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    Please type a valid pod provider.
                                </Alert>
                            </Collapse>
                            <LoginSolid provider={textValue} redirectUrl={redirectUrl} setOpen={setOpen} />
                        </Box>
                        :
                        <Box>
                            <Collapse in={open}>
                                <Alert
                                    severity={"info"}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    Please type a valid pod provider.
                                </Alert>
                            </Collapse>
                            <Button onClick={handleSubmit} style={{color: 'white'}} >Submit</Button>
                        </Box>
                    }
                </Box>
            </Paper>
        </Grid>
   )
}