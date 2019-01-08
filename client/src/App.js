import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import ChatComponent from './components/ChatComponent';
import RequireAuth from './components/hoс/RequireAuth';
import NotRequireAuth from './components/hoс/NotRequireAuth';


import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
} 
let socket;
class App extends Component {
  constructor() {
    super()
  
  }
 
 
  render() {
    
    
    return (
      <Provider store = { store }>
       <div>
        <Router>
            <div>
              <Navbar />
                <Route path="/getusers" component={ RequireAuth(ChatComponent) } /> 

                <div className="container">
                  <Route exact path="/register" component={ NotRequireAuth(Register) } />
                  <Route exact path="/login" component={ NotRequireAuth(Login) } />
                </div>
            </div>
          </Router>
          </div>
        </Provider>
    );
  }
}

export default App;
