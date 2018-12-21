import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {apiUrl} from '../src/config';

class App extends Component {
  componentDidMount() {
    console.log("ping", `${apiUrl}/api`);
    fetch(`${apiUrl}/api`).then(res=> {
      console.log(res);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </header>
      </div>
    );
  }
}

export default App;
