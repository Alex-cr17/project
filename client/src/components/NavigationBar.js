import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class NavigatonBar extends Component {
  
constructor(props) {
  super(props);
  this.state = {
  }
}

handleLogout(event) {
    event.preventDefault();
    axios.post(`http://localhost:8080/logout`)
    .then(response => {
      console.log("response", response);
    })
    .catch(error => {
      console.log("error", error.response.data.message);
    });
  }

  render() {
    return (
      <div>
        
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">The Chat</Link>
          </div>
            <div>
            <Link to="/register" className="right-menu">Sign up</Link>
          </div>
      </nav>
      </div>
    );
  }
}

export default NavigatonBar;
