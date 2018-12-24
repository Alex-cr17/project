import React, { Component } from 'react';

class SignUp extends Component {
  
constructor(props) {
  super(props);
  this.state = {
  }
}

  render() {
    return (
      <div>
        <form>
            <h1>Sign Up</h1>
            <div>
                <input type="text" name="email" placeholder="Your E-mail"/>
                <input type="password" name="password" placeholder="Enter password"/>
                <input type="submit" name="submit" value="Sign up"/>
            </div>
        </form>
        
      </div>
    );
  }
}

export default SignUp;
