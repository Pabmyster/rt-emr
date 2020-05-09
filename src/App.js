// src/App.js

import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BaseCSS } from 'styled-bootstrap-grid';
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./components/ExternalApi";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard"
import Patients from "./views/Patients/Patients.js";
import Patient from "./views/Patients/Patient.js";

import "./App.css";



function App() {
  const { loading, isAuthenticated } = useAuth0();
  
  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  

  
  

  return (
    <div className="App">
      <BaseCSS/>
      {/* New - use BrowserRouter to provide access to /profile */}
      <BrowserRouter>
        {isAuthenticated && <NavBar/>}
        <div className="Content">
          <Switch>
            <Route path="/" exact component={Login}/>

            
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/patient" component={Patients} exact/>
              <PrivateRoute path="/patient/:id" component={Patient} />

              <PrivateRoute path="/external-api" component={ExternalApi} />
              <PrivateRoute path="/profile" component={Profile} />
            
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;