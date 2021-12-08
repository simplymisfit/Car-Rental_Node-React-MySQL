import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {

    const [role, setRole] = useState('');

    
    let loggedRole = sessionStorage.getItem('loggedRole');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setRole(response.data.user[0].role);
                console.log(response.data);
            }
        });
    }, []);

    return ( 
        <nav className="navbarr">
            {(() => {
                console.log("Rola: ", role);
                if (loggedRole === "admin") {
                    return (
                        <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/list">List</Link>
                        <Link to="/create">Create</Link>
                        <Link to="/delete">Delete</Link>
                        <Link to="/edit">Edit</Link>
                        <Link to="/adminList">Admin List</Link>
                        <Link to="/adminLog">Log</Link>
                        <div className="floatToRight">
                            <Link to="/logout">Logout</Link>
                        </div>
                    </div>
                    )
                } 
                if (loggedRole === "user") {
                    return (
                        <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/list">List</Link>
                        <Link to="/create">Create</Link>
                        <Link to="/accountBalance">Account balance</Link>
                        <div className="floatToRight">
                            <Link to="/userCurrentReservations">My reservations</Link>
                            <Link to="/userReservations">History</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    </div>
                    )
                } else {
                    return (
                        <div className="links">
                            <Link to="/">Home</Link>
                            <div className="floatToRight">
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </div>
                        </div>
                    )
                }
            })()}
        </nav>
     );
}
 
export default Navbar;