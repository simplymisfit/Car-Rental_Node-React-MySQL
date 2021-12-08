import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios'
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from "./Create";
import Login from "./Login";
import Register from "./Register";
import Delete from "./Delete";
import Edit from "./Edit";
import List from "./List";
import AdminList from "./AdminList";
import AdminLog from "./AdminLog";
import UserReservations from "./UserReservations";
import UserCurrentReservations from "./UserCurrentReservations";
import Details from "./Details";
import AccountBalance from "./AccountBalance";

function Logout(){
  sessionStorage.removeItem('loggedRole');
  sessionStorage.removeItem('logged');
  window.open("/","_self");
}

function App() {
  
return (
  <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/delete">
            <Delete />
          </Route>
          <Route exact path="/edit">
            <Edit />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/list">
            <List />
          </Route>
          <Route exact path="/adminList">
            <AdminList />
          </Route>
          <Route exact path="/adminLog">
            <AdminLog />
          </Route>
          <Route exact path="/userReservations">
            <UserReservations />
          </Route>
          <Route exact path="/userCurrentReservations">
            <UserCurrentReservations />
          </Route>
          {/* <Route path="/details/:id" component={Details}/> */}
          <Route exact path="/details">
            <Details />
          </Route>
          <Route exact path="/accountBalance">
            <AccountBalance />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
);
}

export default App;
