import React, { useState, useEffect, useReducer } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl } from 'react-bootstrap';

let loggedRole = sessionStorage.getItem('loggedRole');
let userId = sessionStorage.getItem('userId');

axios.defaults.withCredentials = true;

const AccountBalance = () => {
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [movieReviewList, setMovieList] = useState([]);
    const [balanceList, setBalanceList] = useState([]);
    const [id_car, setId_car] = useState('');
  
    const [newReview, setNewReview] = useState('');
  
    useEffect( () => {
        axios.get(`http://localhost:3001/api/getbalanceinfo?id_user=${userId}`).then((response) => {
            console.log("Moj wlasny consolelog = : " + response.data);
            setBalanceList(response.data);
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
        <div className="accountBalance">
            <div className="form">
              <h1>Your current balance is: </h1>
              {balanceList.map((val) => {
                  return <h1>{val.balance} zł</h1> 
                     
                })}
                <h1>If you want to add money to your account, please press <br></br><Button onClick={() => {updateBalance(userId);}}>here</Button></h1>
              </div>
        </div>
     );
}
 
export default AccountBalance;