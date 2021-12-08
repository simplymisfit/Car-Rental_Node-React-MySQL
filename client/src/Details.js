import React, { useState, useEffect, useReducer } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


let loggedRole = sessionStorage.getItem('loggedRole');
let userId = sessionStorage.getItem('userId');

axios.defaults.withCredentials = true;

const Details = () => {

    const [movieReviewList, setMovieList] = useState([]);
  
    const [newReview, setNewReview] = useState('');

    const search = window.location.search;


    useEffect( () => {
        console.log(search);
        axios.get(`http://localhost:3001/api/getdetails` + search).then((response) => {
        setMovieList(response.data);
      });
    }, []);

    return ( 
        <div className="details">
        
        <h1>Details</h1>
              <div className="form">

                {movieReviewList.map((val) => {
                  return <div className="card"><h1>{val.movieName}</h1> 
                  <p>{val.movieReview}</p>
                  <p>Price: {val.cost} zł</p>                 
                  </div>
                })}
              </div>
                </div>
     );
}
 
export default Details;