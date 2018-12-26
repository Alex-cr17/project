import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    username: '',
    password: ''
  }
}
onChange(event) {
  this.setState({ 
    [event.target.name]: event.target.value 
  });
}

handleSubmitLogin = (event) => {
  event.preventDefault();
  axios.post(`http://localhost:8080/login`, {
    username: this.state.username,
    password: this.state.password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log("error", error.response.data.message);
  });
}
  render() {
    return (
      <div>
            <h1>Log In</h1>
            <div>
        <form onSubmit={this.handleSubmitLogin}>
                <input type="text" onChange={(event) => this.onChange(event)} name="username" placeholder="Your E-mail"/>
                <input type="password" onChange={(event) => this.onChange(event)} name="password" placeholder="Enter password"/>
                <input type="submit" name="submit" value="Log in"/>
        </form>
            </div>
        
      </div>
    );
  }
}

export default SignIn;
