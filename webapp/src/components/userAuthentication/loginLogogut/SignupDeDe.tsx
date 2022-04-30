import { useSession } from "@inrupt/solid-ui-react";
import { Alert, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export const SignupDeDe = () => {
	const {signupDeDe} = useUser()
	const history = useHistory();
	const {session} = useSession()
	const [error, setError] = useState<string>()
	const [webId, setWebId] = useState<string>(session.info.webId ||'')
	const [password, setPassword] = useState<string>('')
	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const paperStyle={padding :20,height:'auto', maxHeight:"50%" , width:"50%", margin:"20px auto"}
	const btnstyle={margin:'8px 0'}

	const handleError = () => {
		setPassword('')
		setPasswordConfirm('')
	}

	const handleSubmit = async () => {
		if (password != passwordConfirm) {
			setError('Passwords don\'t match')
			handleError()
			return;
		}
		try {
			await signupDeDe(webId, password)
			history.push('/')
		} catch (error : any) {
			if (error.response.status == 409) {
				setError('username already registered')
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
				<Grid item paddingTop="1em">
					<TextField 
						label='Confirm password' 
						placeholder='Enter password confirmation' 
						type='password' 
						fullWidth 
						required
						value={passwordConfirm} 
						onChange={e => setPasswordConfirm(e.currentTarget.value)}
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