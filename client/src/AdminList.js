import React, { useState, useEffect, useReducer } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl } from 'react-bootstrap';

let loggedRole = sessionStorage.getItem('loggedRole');
let userId = sessionStorage.getItem('userId');

axios.defaults.withCredentials = true;

const AdminList = () => {
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);
    const [id_car, setId_car] = useState('');
  
    const [newReview, setNewReview] = useState('');
  
    useEffect( () => {
      axios.get('http://localhost:3001/api/getreserved').then((response) => {
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

      const deupdateReservation = (movie, id) => {
        axios.put("http://localhost:3001/api/dereservation", {
          movieName: movie,
          id: id, 
        });
      };


    return ( 
        <div className="adminList">

        <h1>Admin list</h1>
              <div className="form">

                {movieReviewList.map((val) => {
                  return <div className="card">
                    <h1>{val.movieName}</h1> 
                    <p>{val.movieReview}</p>
                    <Button onClick={() => {deupdateReservation(val.movieName, val.id);}}>Unreserve</Button>
                  </div>
                })}
              </div>
                </div>
     );
}
 
export default AdminList;