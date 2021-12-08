import React, { useState, useEffect, useReducer } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

let loggedRole = sessionStorage.getItem('loggedRole');
let userId = sessionStorage.getItem('userId');

axios.defaults.withCredentials = true;

const List = () => {

    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);
    const [id_car, setId_car] = useState('');
  
    const [newReview, setNewReview] = useState('');
  
    useEffect( () => {
      axios.get('http://localhost:3001/api/get').then((response) => {
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

      const updateReservation = (movie) => {
        axios.put("http://localhost:3001/api/reservation", {
          movieName: movie, 
        });
      };

      const updateReservationGetMoney = (id_user, cost) => {
        axios.put("http://localhost:3001/api/reservationGetMoney", {
          id_user: id_user,
          cost: cost, 
        });
      };

      const reserveCar = (id_car) => {
        console.log(userId);
        axios.post("http://localhost:3001/api/reserve", {
          id_user: userId, 
          id_car: id_car
        });
      };

      const reserving = () => {
        updateReservation();
        reserveCar();
      }

    return ( 
        <div className="list">

        <h1>List</h1>
              <div className="form">

                {movieReviewList.map((val) => {
                  console.log(val);
                  return <div className="card"><h1>{val.movieName}</h1> 
                  <p>{val.movieReview}</p>
                    
                    <Link to={`/details?id=${val.id}`}>Details</Link>
                    <br></br>
                    <Button onClick={() => {reserveCar(val.id); updateReservation(val.movieName); updateReservationGetMoney(userId, val.cost); }}>Reserve</Button>
                    <br></br>
                  
                  </div>
                })}
              </div>
                </div>
     );
}
 
export default List;