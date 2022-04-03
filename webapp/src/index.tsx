import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SessionProvider} from "@inrupt/solid-ui-react"

ReactDOM.render(
    <SessionProvider>
        <App/>
    </SessionProvider>
    ,
    document.getElementById('root')
);