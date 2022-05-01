import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SessionProvider} from "@inrupt/solid-ui-react"
import { UserProvider } from './context/UserContext';

ReactDOM.render(
    <SessionProvider>
        <UserProvider>
			<App/>
		</UserProvider>
    </SessionProvider>
    ,
    document.getElementById('root')
);