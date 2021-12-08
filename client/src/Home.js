import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

    const [role, setRole] = useState('');

    axios.defaults.withCredentials = true;

    let loggedRole = sessionStorage.getItem('loggedRole');
    console.log(loggedRole);

    return ( 
        <div className="welcome">

        <h1>Witaj na mojej stronie!</h1>
            {(() => {
                console.log("Rola: ", role);
                if (loggedRole === "admin") {
                    return (
                        <h1>ADMINISTRATOR</h1>
                    )
                } 
                if (loggedRole === "user") {
                    return (
                        <h1>UZYTKOWNIK</h1>
                    )
                } else {
                    return (
                        <div>
                            <h1>Jeżeli nie masz konta <Link to="/register">zarejestruj się</Link></h1>
                            <h1>Masz konto? <Link to="/login">zaloguj się</Link></h1>
                        </div>
                    )
                }
            })()}
        </div>
     );
}
 
export default Home;