import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl } from 'react-bootstrap';

let loggedRole = sessionStorage.getItem('loggedRole');

axios.defaults.withCredentials = true;

const Create = () => {

    const [movieName, setMovieName] = useState('');
    const [cost, setCost] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);
  
    const [newReview, setNewReview] = useState('');
  
    useEffect( () => {
      axios.get('http://localhost:3001/api/getall').then((response) => {
        setMovieList(response.data);
      });
    }, []);
  
    const submitReview = () => {
      axios.post('http://localhost:3001/api/insert', {
        movieName: movieName, 
        movieReview: review,
        cost: cost
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

    return ( 
      <div className="create">
          {(() => {
                          if (loggedRole === "admin" || loggedRole === "user") {
                              return (
                                <div className="create">

                                <h1>CRUD APPLICATION</h1>
                                      <div className="form">
                                        <label>Movie name:</label>
                                        <FormControl type="text" name="movieName" onChange={(e) => {
                                          setMovieName(e.target.value)
                                        }} />
                                        <label>Review:</label>
                                        <FormControl type="text" name="review" onChange={(e) => {
                                          setReview(e.target.value)
                                        }} />
                                        <label>Cost:</label>
                                        <FormControl type="text" name="cost" onChange={(e) => {
                                          setCost(e.target.value)
                                        }} />
                                
                                        <Button onClick={submitReview}>Submit</Button>
                                
                                        {movieReviewList.map((val) => {
                                          return <div className="card"><h1>{val.movieName}</h1> 
                                          <p>{val.movieReview}</p>
                                          </div>
                                        })}
                                      </div>
                                        </div>
                              )
                          } else {
                              return (
                                  <div className="createe">
                                    <h1>Nie masz uprawnień do przeglądania tej strony!</h1>
                                  </div>
                              )
                          }
                      })()}


      </div>




     );
}
 
export default Create;