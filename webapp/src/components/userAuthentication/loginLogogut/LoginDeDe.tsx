import { useSession } from "@inrupt/solid-ui-react";
import { Alert, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export const LoginDeDe = () => {
	const {loginDeDe} = useUser()
	const history = useHistory()
	const {session} = useSession()
	const [error, setError] = useState<string>()
	const [webId, setWebId] = useState<string>(session.info.webId || '')
	const [password, setPassword] = useState<string>('')
	const paperStyle={padding :20,height:'auto', maxHeight:"50%" , width:"50%", margin:"20px auto"}
	const btnstyle={margin:'8px 0'}

	const handleError = () => {
		setPassword('')
	}

	const handleSubmit = async () => {
		try {
			await loginDeDe(webId, password)
			history.push('/')
		} catch (error : any) {
			console.log(error)
			if (error.response.status == 401) {
				setError('incorrect user or password')
				handleError()
			}
		}
	}

	return(
        <Grid container>
            <Paper elevation={10} style={paperStyle}>
				<Grid item>
					<TextField 
						label='Username' 
						placeholder='webId' 
						fullWidth 
						required
						value={webId} 
						onChange={e => setWebId(e.currentTarget.value)}
					/>
				</Grid>
				<Grid item paddingTop="1em">
					<TextField 
						label='Password' 
						placeholder='Enter password' 
						type='password' 
						fullWidth 
						required
						value={password} 
						onChange={e => setPassword(e.currentTarget.value)}
					/>
				</Grid>
				{error ?  
					<Grid item paddingTop="1em">
						<Alert severity="error">{error}</Alert>
					</Grid>
					:
					<></>
				}
				<Grid item paddingTop="1em">
					<Button 
						type='submit' 
						color='primary' 
						variant="contained" 
						style={btnstyle} 
						fullWidth 
						onClick={handleSubmit}
					>
						log in
					</Button>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						You don't have an account?
						<Link href="dede/signup">
							Sign Up 
						</Link>
					</Typography>
				</Grid>
            </Paper>
        </Grid>
    )
}