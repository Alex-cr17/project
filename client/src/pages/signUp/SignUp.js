import React, { Component } from 'react';
import axios from 'axios';
class SignUp extends Component {
  
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

handleSubmitRegister = (event) => {
  event.preventDefault();
  if(this.state.username == '' || this.state.password == '') {
    alert("Enter username or password");
    return;
  }
  axios.post(`http://localhost:8080/register`, {
    username: this.state.username,
    password: this.state.password
  })
  .then(response => {
    console.log("response", response);

  })
  .catch(error => {
    console.log("error", error.response.data.message);
    alert(error.response.data.message);
  });
}

  render() {
    return (
      <div className="page-signup">
          <h1>Sign Up</h1>
          <div>
            <form className="form-signup" onSubmit={this.handleSubmitRegister}>
              <input type="text" onChange={(event) => this.onChange(event)} name="username" placeholder="Your username"/>
              <input type="password" onChange={(event) => this.onChange(event)} name="password" placeholder="Enter password"/>
              <input type="submit" name="submit" value="Sign up"/>
            </form>
          </div>
        
      </div>
    );
  }
}

export default SignUp;
