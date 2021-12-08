import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    let loggedRole = sessionStorage.getItem('loggedRole');

    axios.defaults.withCredentials = true;

    const login = () => {
        axios.post('http://localhost:3001/login', {username: username, password: password}).then((Response) => {

            if (Response.data.message) {
                setLoginStatus(Response.data.message);
            } else {
                sessionStorage.setItem('loggedRole', Response.data[0].role);
                sessionStorage.setItem('logged', true);
                sessionStorage.setItem('userId', Response.data[0].id);
                setLoginStatus(Response.data[0].username);
                window.open("/","_self");
            }
        });
    };

    return ( 
        <div className="login">
            <h1>Login page</h1>
            <h2>Username</h2>
            <input type="text" onChange={(e) => {setUsername(e.target.value);}}></input>
            <h2>Password</h2>
            <input type="password" onChange={(e) => {setPassword(e.target.value);}}></input><br/><br/>
            <Button onClick={login} >Login</Button>
            <h1>{loginStatus}</h1>
        </div>
     );
}
 
export default Login;