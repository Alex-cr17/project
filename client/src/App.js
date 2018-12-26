import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import NavigationBar from './components/NavigationBar';


import List from './pages/List'
// import { subscribeToTimer } from './api';
import socketIOClient from 'socket.io-client'

import './App.css';
// import {apiUrl} from '../src/config';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:8080", 
    }
  }

  sendMessage = (event) => {
    event.preventDefault();
    const socket = socketIOClient(this.state.endpoint)
    socket.emit('send message', this.message.value) 
  }

  render() {
    const socket = socketIOClient(this.state.endpoint)
    
    socket.on('send message', (message) => {
      document.getElementById('correspondence').append(message); 
    });

    return (
      <div>
        <NavigationBar/>
        <Switch>
          <Route exact path='/register' component={SignUp}/>
          <Route exact path='/login' component={SignIn}/>
        </Switch>
        <div>
          Hello!
        </div>
      </div>
    );
  }
}

export default App;
