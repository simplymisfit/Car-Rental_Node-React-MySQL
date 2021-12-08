import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Logout = () => {

    const [role, setRole] = useState('');

    const [loginStatus, setLoginStatus] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3001/logout").then((response) => {
            console.log("response.data.loggedIn = ",response.data.loggedIn);
        });
    }, []);

    return ( 
        <div className="logout">
            <h1>Zostałeś wylogowany!</h1>
        </div>
     );
}
 
export default Logout;