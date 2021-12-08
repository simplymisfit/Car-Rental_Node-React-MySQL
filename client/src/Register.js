import axios from "axios";
import { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    axios.defaults.withCredentials = true;

    const register = () => {
        axios.post('http://localhost:3001/register', {username: usernameReg, password: passwordReg}).then((Response) => {
            console.log(Response);
        });
    };

    return ( 
        <div className="register">
            <h1>Register page</h1>
            <h2>Username</h2>
            <input type="text" onChange={(e) => {setUsernameReg(e.target.value);}}></input>
            <h2>Password</h2>
            <input type="password" onChange={(e) => {setPasswordReg(e.target.value);}}></input><br/><br/>
            <Button onClick={register} >Register</Button>
        </div>
     );
}
 
export default Register;