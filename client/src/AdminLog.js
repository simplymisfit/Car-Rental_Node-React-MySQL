import React, { useState, useEffect, useReducer } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';

let loggedRole = sessionStorage.getItem('loggedRole');
let userId = sessionStorage.getItem('userId');

axios.defaults.withCredentials = true;

const AdminLog = () => {
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);
    const [id_car, setId_car] = useState('');
  
    const [newReview, setNewReview] = useState('');
  
    useEffect( () => {
      axios.get('http://localhost:3001/api/getlog').then((response) => {
        setMovieList(response.data);
        if (!response.data) {
            setId_car(response.data[0].id);
          }
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


    return ( 
        <div className="adminLog">

        <h1>Admin log</h1>
              <div className="form">

                {movieReviewList.map((val) => {
                  return <div className="card">
                    <h1>Użytkownik o id {val.id_user}</h1> 
                    <p>wypożyczył samochód o id {val.id_car}</p>
                    <p>dnia {val.date}</p>
                  </div>
                })}
              </div>
                </div>
     );
}
 
export default AdminLog;