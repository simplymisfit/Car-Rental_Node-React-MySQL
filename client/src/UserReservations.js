import React, { useState, useEffect, useReducer } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';

let loggedRole = sessionStorage.getItem('loggedRole');
let userId = sessionStorage.getItem('userId');

axios.defaults.withCredentials = true;

const UserReservations = () => {
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);
    const [id_car, setId_car] = useState('');
  
    const [newReview, setNewReview] = useState('');
  
    useEffect( () => {
      axios.get(`http://localhost:3001/api/userreservationsss?id_user=${userId}`).then((response) => {
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

      const deupdateReservation = (movie) => {
        axios.put("http://localhost:3001/api/dereservation", {
          movieName: movie, 
        });
      };

      const userReservations = () => {
        axios.post('http://localhost:3001/api/userreservations', {
          id_user: userId,
        });

    }
    return ( 
        <div className="userReservations">

        <h1>User history</h1>
              <div className="form">

                {movieReviewList.map((val) => {
                  return <div className="card"><h1>Car id: {val.id_car}</h1> 
                  <p>User id: {val.id_user}</p>
                  <p>Date: {val.date}</p>
                  </div>
                })}
              </div>
                </div>
     );
}
 
export default UserReservations;