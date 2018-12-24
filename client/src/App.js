import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import List from './pages/List'
// import { subscribeToTimer } from './api';
import socketIOClient from 'socket.io-client'

// import './App.css';
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
        <Switch>
          <Route exact path='/signUp' component={SignUp}/>
        </Switch>

        <form>
          <input type="text" ref={(input => this.message = input)}/>
          <input type="submit" value="Send" onClick={(event) => this.sendMessage(event)}/>
        </form>
        <div id="correspondence">

        </div>
      </div>
    );
  }
}

export default App;
