import React from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { Alert, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export const LoginDeDe = () => {
	const {loginDeDe, signupDeDe} = useUser()
	const history = useHistory()
	const {session} = useSession()
	const [error, setError] = useState<string>('')
	const [webId, setWebId] = useState<string>(session.info.webId || '')
	const [password, setPassword] = useState<string>('')
	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const [logIn, setLogin] = useState<boolean>(true)
	const paperStyle={padding :20,height:'auto', maxHeight:"50%" , width:"50%", margin:"20px auto"}
	const btnstyle={margin:'8px 0'}

	const handleError = () => {
		setPassword('')
	}


	const handleSubmitLogIn = async () => {
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
	const handleSubmitSignIn = async () => {
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
				{logIn ? 
				<>
				<Grid item paddingTop="1em">
					<Button 
						type='submit' 
						color='primary' 
						variant="contained" 
						style={btnstyle} 
						fullWidth 
						onClick={handleSubmitLogIn}
						>
						log in
					</Button>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						Don't have an account?
						<Button onClick={() => setLogin(false)}>
							Sign in
						</Button>
					</Typography>
				</Grid>
				</>
				:
				<>
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
				<Grid item paddingTop="1em">
					<Button 
						type='submit' 
						color='primary' 
						variant="contained" 
						style={btnstyle} 
						fullWidth 
						onClick={handleSubmitSignIn}
					>
						Sign in
					</Button>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						have an account?
						<Button onClick={() => setLogin(true)}>
							Log in
						</Button>
					</Typography>
				</Grid>
				</>
				}
				<Grid item paddingTop="1em">
					<Alert severity="error" hidden={error == ''}>{error}</Alert>
				</Grid>
            </Paper>
        </Grid>
    )
}