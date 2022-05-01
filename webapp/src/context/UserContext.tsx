import axios from 'axios';
import React, {useState} from 'react';
import { useMemo } from 'react';

interface IUserContext {
	token: string,
	role: string,
	isLoggedInDeDe: boolean,
	loginDeDe: (webId: string, password: string) => Promise<any>,
	signupDeDe: (webId: string, password: string) => Promise<any>,
	logoutDeDe: () => void
}

const UserContext = React.createContext<IUserContext | null>(null)


export const UserProvider = (props:any) => {
	const [token, setToken] = useState<string | null>()
	const [role, setRole] = useState<string | null>()
	const [isLoggedInDeDe, setIsLoggedInDeDe] = useState<boolean>(false)
	const apiEndPoint = process.env.REACT_APP_API_URI

	const signupDeDe = async (webId:string, password:string) => {
		let response = await axios.post(apiEndPoint + "/user/signup", {
			webId: encodeURI(webId),
			password: password
		})
		setToken(response.data.token)
		setRole(response.data.role)
		setIsLoggedInDeDe(true)
		return response.data
	}

	const loginDeDe = async (webId:string, password: string) => {
		let response = await axios.post(apiEndPoint + "/user/login", {
			webId: encodeURI(webId),
			password: password
		})
		setToken(response.data.token)
		setRole(response.data.role)
		setIsLoggedInDeDe(true)
		return response.data
	}

	const logoutDeDe = () => {
		setIsLoggedInDeDe(false)
		setToken(null)
		setRole(null)
	}

	const value = useMemo(() => {
		return ({
			token,
			role,
			isLoggedInDeDe,
			loginDeDe,
			signupDeDe,
			logoutDeDe
		})
	}, [token, role, isLoggedInDeDe])

	return <UserContext.Provider value={value} {...props} />
}


export const useUser = () => {
	const ctx = React.useContext(UserContext)
	if (!ctx) {
		throw new Error('this hook must be inside UserProvider')
	}
	return ctx
}