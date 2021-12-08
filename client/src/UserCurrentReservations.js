import React, { useState, useEffect, useReducer } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl } from 'react-bootstrap';

let loggedRole = sessionStorage.getItem('loggedRole');
let userId = sessionStorage.getItem('userId');

axios.defaults.withCredentials = true;

const UserReservations = () => {
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);
    const [balanceList, setBalanceList] = useState([]);
    const [id_car, setId_car] = useState('');
  
    const [newReview, setNewReview] = useState('');
  
    useEffect( () => {
      axios.get(`http://localhost:3001/api/userreservations?id_user=${userId}`).then((response) => {
        console.log("Moj wlasny consolelog = : " + response.data);
        setMovieList(response.data);
      });
    }, []);
  
    const submitReview = () => {
      axios.post('http://localhost:3001/api/insert', {
        movieName: movieName, 
        movieReview: review
      });
  
      setMovieList([
        ...movieReviewList, 
        {movieName: movieName, movieReview: review },
        ]);
      };
  
      const deleteReview = (movie) => {
        axios.delete(`http://localhost:3001/api/delete/${movie}`);
      }
  
      const updateReview = (movie) => {
        axios.put("http://localhost:3001/api/update", {
          movieName: movie, 
          movieReview: newReview
        });
        setNewReview("");
      };

      const unreserveCar = (movie) => {
        axios.delete(`http://localhost:3001/api/unreserve/${userId}`);
      };

      const deupdateReservation = (movie, id) => {
        axios.put("http://localhost:3001/api/dereservation", {
          movieName: movie, 
          id: id,
        });
      };

      const userReservations = () => {
        axios.post('http://localhost:3001/api/userreservations', {
          id_user: userId,
        });
    }

    const updateBalance = (userId) => {
      axios.put('http://localhost:3001/api/updatebalance', {
        id_user: userId,
      });
    };

    const getBalanceInfo = (userId) => {
      axios.get(`http://localhost:3001/api/getbalanceinfo?id_user=${userId}`).then((response) => {
        console.log("Moj wlasny consolelog = : " + response.data);
        setBalanceList(response.data);
      });
    };
  


    return ( 
        <div className="userReservations">

        <h1>User reservations</h1>
              <div className="form">

                {movieReviewList.map((val) => {
                  console.log("VAL: ",val);
                  return <div className="card"><h1>Car id: {val.id_car}</h1> 
                  <p>User id: {val.id_user}</p>
                  <p>Date: {val.date}</p>
                  <Button onClick={() => {deupdateReservation(val.movieName, val.id);}}>Unreserve</Button>
                  </div>
                })}
              </div>
                </div>
     );
}
 
export default UserReservations;