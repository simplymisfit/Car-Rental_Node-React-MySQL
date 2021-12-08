import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl } from 'react-bootstrap';

let loggedRole = sessionStorage.getItem('loggedRole');

axios.defaults.withCredentials = true;

const Edit = () => {

    const [movieName, setMovieName] = useState('');
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


    return ( 
      <div className="delete">
          {(() => {
                          if (loggedRole === "admin") {
                              return (
                                <div className="edit">
                                <h1>Edit</h1>
                              <div className="form">
                                {movieReviewList.map((val) => {
                                  return <div className="card"><h1>{val.movieName}</h1> 
                                  <p>{val.movieReview}</p>
                                  <FormControl type="text" id="updateInput" onChange={(e) => {
                                    setNewReview(e.target.value);
                                  }} />
                                  <Button onClick={() => {updateReview(val.movieName)}}>Update</Button>
                        
                                  </div>
                                })}
                              </div>
                                </div>
                              )
                          } else {
                              return (
                                  <div className="editt">
                                    <h1>Nie masz uprawnień do przeglądania tej strony!</h1>
                                  </div>
                              )
                          }
                      })()}


      </div>
     );
}
 
export default Edit;